// JS to get the identity of the user.
// for google chrome app, it would the gmail id.

var dummyIdentityProvider = (function() {
    return {
        getUserName : function() {
            return 'test_user';
        }
    };
})();

var googleIdentityProvider = (function() {

    // wrapped id provider inside to check for the availability.
    var googleIdProviderInstance = function () {
        var userName = undefined;
        init();

        function init() {
            // getting the google identity.
            console.log('getting user identity');

            // the below call would pop up a option to Allow/Deny the access the personal information,
            // if it is not granted by the user already.
            chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
                if (chrome.runtime.lastError) {
                    console.log(chrome.runtime.lastError);
                }
                else {
                    console.log('got some token ' + token);
                    getUserInfo(token);
                }
            });
        }

        function getUserInfo(access_token) {
            $.ajax({
                type: 'GET',
                url: 'https://www.googleapis.com/plus/v1/people/me',
                headers: {'Authorization': 'Bearer ' + access_token}
            }).done(function (data) {
                    console.log('got response for user information');
                    console.log(data);

                    if (data) {
                        var emails = data['emails'];
                        var email = emails['0'];
                        var userEmail = ((email && email['type'] === 'account') ? email['value'] : 'not present');

                        console.log('user\'s email id is ' + userEmail);

                        parseEmailAndSetUserName(userEmail);
                    }
                });
        }

        function parseEmailAndSetUserName(userEmail) {
            userName = userEmail.split('@')[0];
            console.log('username is ' + userName);
        }

        return {
            getUserName : function() {
                return userName;
            }
        };
    }

    // init the google identity.
    var chrome = window.chrome || {};
    var oAuthToken = (chrome ? (chrome.identity ? chrome.identity.getAuthToken : undefined) : undefined);

    if (oAuthToken) {
        return new googleIdProviderInstance();
    }
    else {
        return undefined;
    }

})();

var IdentityHelper = (function() {
    var identityProvider = googleIdentityProvider;
    if (!identityProvider) { // fallback if not running in chrome extension.
        identityProvider = dummyIdentityProvider;
    }

    return {
        getUserName : function() {
            return identityProvider.getUserName();
        }
    };
})();