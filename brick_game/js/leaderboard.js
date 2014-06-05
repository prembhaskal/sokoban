/* leaderboard data for a level
    username/email_id
   level_no
   moves
   time.
 */

function LeaderBoardData() {
    this.username = "";
    this.levelNo = -1;
    this.rank = -1;
    this.levelMoves = -1;
    this.levelTime = -1;
}

var dummyLeaderBoardProvider = (function () {
    // dummy store of leader boards.
    var leaderBoardMap = {};
    // fill the store with some dummy data.
    init();

    function init() {
        for (var i = 1; i <= 21; i++) {
            leaderBoardMap[i] = leaderBoardMap[i] || [];
            for (var j = 1; j <= 3; j ++) {
                var leaderBoardData = new LeaderBoardData();
                leaderBoardData.username = 'player_' + j ;
                leaderBoardData.levelNo = i;
                leaderBoardData.rank = j;
                leaderBoardData.levelMoves = 10*i + j;
                leaderBoardData.levelTime = 10.002;
                leaderBoardMap[i].push(leaderBoardData);
            }
        }
    }

    return {
        getLeaderBoardForLevel : function(levelNo) {
            return leaderBoardMap[levelNo];
        },
        getRankForLevel : function(levelNo) {
            return 1;
        },
        updateLeaderBoardForLevel : function(gameState) {
            // do nothing as of now.
        }
    };
})();


function LeaderBoardController() {
    var leaderBoardProvider = dummyLeaderBoardProvider;

    function refreshLeaderBoardOnStart(gameState) {
        var leaderBoardForLevel = leaderBoardProvider.getLeaderBoardForLevel(gameState.getPresentLevel());
        Events.publish(SokobanUtil.eventType.UPDATE_LEADERBOARD, [leaderBoardForLevel]);
    }

    this.init = function() {
        Events.subscribe(SokobanUtil.eventType.LEVEL_START, refreshLeaderBoardOnStart);
    };
}

// view code to update the leader board.
var leaderBoardView = (function(){

    init();

    function updateLeaderBoardForLevel(levelLeaderBoards) {
        // code to add li for each of the leaders.
        var leadersElement = document.getElementById('leaders');

        // clear the leaders for this level first.
        while(leadersElement.firstChild) {
            leadersElement.removeChild(leadersElement.firstChild);
        }

        for (var i = 0; i < levelLeaderBoards.length; i++) {
            var leader = levelLeaderBoards[i];
            var text = leader.username + ' ' + leader.levelMoves + ' moves : ' + leader.levelTime + ' secs';
            var textNode = document.createTextNode(text);
            var liElement = document.createElement('li');
            liElement.appendChild(textNode);

            leadersElement.appendChild(liElement);
        }
    }

    function init() {
        Events.subscribe(SokobanUtil.eventType.UPDATE_LEADERBOARD, updateLeaderBoardForLevel);
    }

})();
