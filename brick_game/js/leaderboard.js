/* leaderboard data for a level
   levelNo
   useName
   moves
   time
   rank
 */

function LeaderBoardData() {
    this.gameStats = []; // array of IndividualScore.
    this.levelNo = -1;
}

function IndividualScore() {
    this.time = -1;
    this.moves = -1;
    this.rank = -1;
    this.userName = "";
}

var dummyLeaderBoardProvider = (function () {
    // dummy store of leader boards.
    var leaderBoardMap = {};

    var userNames = [];

    // fill the store with some dummy data.
    init();

    function init() {
        initDummyLeaderBoard();
        initDummyUserNames();
    }

    function initDummyLeaderBoard() {
        for (var i = 1; i <= 21; i++) {
            leaderBoardMap[i] = leaderBoardMap[i] || [];
            for (var j = 1; j <= 10; j++) {
                var leaderBoardData = new LeaderBoardData();
                leaderBoardData.userName = 'player_' + j;
                leaderBoardData.levelNo = i;
                leaderBoardData.rank = j;
                leaderBoardData.moves = 10 * i + j;
                leaderBoardData.time = 10.002;
                leaderBoardMap[i].push(leaderBoardData);
            }
        }
    }

    function initDummyUserNames() {
        for (var i = 1; i <= 10; i++) {
            var userName = 'player_' + i;
            userNames.push(userName);
        }
    }

    return {
        getLeaderBoardForLevel : function(levelNo, callback) {
            return callback(leaderBoardMap[levelNo]);
        },
        getRankForLevel : function(levelNo, userName) {
            return 1;
        },
        updateLeaderBoardForLevel : function(gameState) {
            // do nothing as of now.
        },
        getAllLeaderBoardData : function(callback) {
            // do nothing :)
        },
        getUserStats : function(callback) {
            // do nothing :)
        },
        getAllUserNames: function(callback) {
            callback(userNames);
        },
        addFriends: function(friends) {

        }

    };
})();


var appEngineLeaderBoardProvider = (function(){

    // all methods are async calls.
    return {
      getAllLeaderBoardData : function(callback) {
          $.ajax({
              type: 'GET',
              url: SokobanUtil.appEngineUrl,
              data: {requestType: 'req_getAllLevel'}
          })
              .done(callback);
      },
      getLeaderBoardForLevel : function(levelNo, callback) {
          $.ajax({
              type: 'GET',
              url: SokobanUtil.appEngineUrl,
              data: {requestType: 'req_getLevel', req_level_no: levelNo}
          })
              .done(callback);
      },
      getUserStats : function(userName, callback) {
          $.ajax({
              type: 'GET',
              url: SokobanUtil.appEngineUrl,
              data: {requestType: 'req_getUserStats', req_level_no: userName}
          })
              .done(callback);
      },
      updateLeaderBoardForLevel : function(levelScore, callback) {
          $.ajax({
              type: 'POST',
              url: SokobanUtil.appEngineUrl,
              data: levelScore
          })
              .done(callback);
      }
    };
})();

function LeaderBoardController() {
  var leaderBoardProvider = dummyLeaderBoardProvider;
//    var leaderBoardProvider = appEngineLeaderBoardProvider;

    function refreshLevelLeaderBoardData(gameState) {
        leaderBoardProvider.getLeaderBoardForLevel(gameState.getPresentLevel(), function(levelData) {
            console.log('leader board data for level ' + gameState.getPresentLevel() + ' fetched');
            console.log(levelData);
            Events.publish(SokobanUtil.eventType.REFRESH_LEVEL_LEADERBOARD, [levelData]);
        });
    }

    function getCompleteLeaderBoardOnStart() {
        leaderBoardProvider.getAllLeaderBoardData(function(allLeaderBoardData) {
           console.log('leader board data fetched');
           console.log(allLeaderBoardData);
           Events.publish(SokobanUtil.eventType.REFRESH_ALL_LEADERBOARD, [allLeaderBoardData]);
        });
    }

    function getUserStats(gameState) {
        var userName = IdentityHelper.getUserName();
        userName = (userName == null || userName === undefined) ? 'test_user' : userName;
        leaderBoardProvider.getUserStats(userName, function(userStatsData) {
            console.log('user data successfully queried');
            console.log(userStatsData);
        });
    }

    function updateLeaderBoardData(gameState) {
        var levelScore = {};
        var userName = IdentityHelper.getUserName();
        if (!userName) {
            console.log("ERROR - username not available, high score won't be uploaded");
            return;
        }
        levelScore['userName'] = userName;
        levelScore['time'] = gameState.getElapsedTime();
        levelScore['moves'] = gameState.getMoves();
        levelScore['req_level_no'] = gameState.getPresentLevel();

        leaderBoardProvider.updateLeaderBoardForLevel(levelScore, function() {
            console.log('updated the leader board with the present score.');
        });
    }

    function getAllUserNames() {

    }

    this.init = function() {
        Events.subscribe(SokobanUtil.eventType.LEVEL_START, refreshLevelLeaderBoardData);
        Events.subscribe(SokobanUtil.eventType.LEVEL_START, getUserStats);
        Events.subscribe(SokobanUtil.eventType.GAME_START, getCompleteLeaderBoardOnStart);
        // leader board data is sent only if it is the best score of the user.
        Events.subscribe(SokobanUtil.eventType.GOT_BEST_SCORE, updateLeaderBoardData);
    };
}

// view code to update the leader board.
// TODO use the complete leader board data (if available) to obtain the 1st/default/fallback leader board for a level.
// after that try to get the new data for the level, if available override current data / update complete data etc.
var leaderBoardView = (function(){

    var allLevelLeaderBoardData;

    init();

    // TODO delay might cause levelboarddata to come in incorrect sequence.
    // FIXME Check the present level before updating the level? how to do it?
    function updateLeaderBoardForLevel(levelLeaderBoard) {
        // code to add li for each of the leaders.
        var leadersElement = document.getElementById('leaders');

        // clear the leaders for this level first.
        while(leadersElement.firstChild) {
            leadersElement.removeChild(leadersElement.firstChild);
        }

        for (var i = 0; i < 3; i++) {
            var leader = levelLeaderBoard[i];
            if (!leader)
                break; // show at max 3 leaders, stop if there are less leaders.
            // create a Text Node
            var text = leader.userName + ' : ' + leader.moves + ' moves - ' + leader.time + ' secs';
            var textNode = document.createTextNode(text);
            // wrap it with a Span
            var textSpan = document.createElement('span');
            textSpan.classList.add('leader_text');
            textSpan.appendChild(textNode);

            // add the span to the li
            var liElement = document.createElement('li');
            liElement.appendChild(textSpan);

            leadersElement.appendChild(liElement);
        }
    }

    function updateUserNamesForFriendSelection(userNames) {

    }

    function updateAllLevelLeaderBoardData(allLevelLeaderData) {
        allLevelLeaderBoardData = allLevelLeaderData;
    }

    function init() {
        Events.subscribe(SokobanUtil.eventType.REFRESH_LEVEL_LEADERBOARD, updateLeaderBoardForLevel);
        Events.subscribe(SokobanUtil.eventType.REFRESH_ALL_LEADERBOARD, updateAllLevelLeaderBoardData);
    }

})();
