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
    var leaderBoardMap = [];
    // fill the store with some dummy data.
    init();

    function init() {
        var leaderBoardData = new LeaderBoardData();
        leaderBoardData.username = "player";
        leaderBoardData.levelNo = 1;
        leaderBoardData.rank = 1;
        leaderBoardData.levelMoves = 25;
        leaderBoardData.levelTime = 10.002;
        leaderBoardMap[1] = leaderBoardData;
    }

    return {
        getLeaderBoardForLevel : function(levelNo) {
            return leaderBoardMap;
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
        var userRankForLevel = leaderBoardForLevel.getRankForLevel(gameState.getPresentLevel());
        // update UI with the same.
    }

    this.init = function() {
        Events.subscribe(SokobanUtil.eventType.LEVEL_START, refreshLeaderBoardOnStart);

    }
}
