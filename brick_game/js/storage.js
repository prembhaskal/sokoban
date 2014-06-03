//  Various DataBase APIs go here

// Default storage API, when no storage is available.
var defaultStorageAPI = (function() {
    var hashTable = {};

    return {
        get : function(keys, callback) {
            // convert to array, if the value is not array.
            if (typeof(keys) === 'string')
                keys = [keys];

            // result is key value pair object.
            var resultObject = {};

            // iterate through each value in the string array.
            for (i in keys) {
                if (!keys.hasOwnProperty(i)) continue;
                var key = keys[i];
                resultObject[key] = hashTable[key];
            }

            callback(resultObject);
        },
        set : function(keyValObj, callback) {
            // iterate through keys
            for (prop in keyValObj) {
                if (keyValObj.hasOwnProperty(prop) && typeof(prop) === 'string') {
                    hashTable[prop] = keyValObj[prop];
                }
            }

            callback();
        }
    }
})();

// Chrome Storage API, available only when app is run as an extension.
var chromeStorageAPI = (function () {
    var chrome = window.chrome || {};
    var storageArea = (chrome ? (chrome.storage ? chrome.storage.sync: undefined) : undefined);

    var chromeAPIInstance = {
        get: function (keys, callback) {
            storageArea.get(keys, callback);
        },
        set: function (keyValObj, callback) {
            storageArea.set(keyValObj, callback);
        }
    };

    if (storageArea) { // return instance only if storage available.
        return chromeAPIInstance;
    }
    else {
        return undefined;
    }
})();


/*
 Generic Storage API Provider.
 General interface of an StorageAPI would be as follows
 get the stored value -- async call, use the callback to process the returned result.
 keys - string or array of strings
 callback - it should be like function(items){...};
 items --> Object with stuffs in their key-value mappings.
 get : function(keys, callback)

 set the key value pairs present in the keyValuePairObject, async call.
 keyValuePairObject - object which gives each key/value pair to update storage with
 callback should be like function() { ... };
 set : function(keyValuePairObject, callback)
 */
var storageAPIProvider = (function () {
    return {
        getStorageAPI: function (type) {
            switch (type) {
                case SokobanUtil.storageType.CHROME_API:
                    return chromeStorageAPI;

                case SokobanUtil.storageType.FALLBACK:
                    return defaultStorageAPI;

                default :
                    return undefined;
            }
        }
    };
})();

// state of the level.
function LevelState(levelNo) {
    this.levelNo = levelNo;
    this.solutionMoves = 0;
    this.solutionTime = 0;
}

LevelState.prototype.setSolutionMoves = function (moves) {
    this.solutionMoves = moves;
};

LevelState.prototype.setSolutionTime = function(time) {
    this.solutionTime = time;
};

function StorageHelper(storageType) {
    var storageAPI = storageAPIProvider.getStorageAPI(storageType);
    if (!storageAPI) { // fallback to default storage api.
        console.log('storage API not available... falling back to default api');
        storageAPI = storageAPIProvider.getStorageAPI(SokobanUtil.storageType.FALLBACK);
    }

    var levelKeyPrefix = 'levelInfo';

    this.storeLevelState = function (levelState) {
        var key = levelKeyPrefix + levelState.levelNo;

        // create the key : value object as required for storing.
        var keyValueObject = {};
        keyValueObject[key] = levelState;

        storageAPI.set(keyValueObject, function () {
            console.log('state of the level - ' + levelState.levelNo + ' is stored successfully');
        });
    };

    this.getLevelState = function (levelNo, callback) {
        var key = levelKeyPrefix + levelNo;

        storageAPI.get(key, function (result) {
            callback(result[key]);
        });
    };
}
