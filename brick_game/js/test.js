//TODO -Remove unnecessary comments

var gameController = null;

function initializeGame(table) {
	gameController = new GameController();
	gameController.initializeGame(table);
}

function playNextLevel(table) {
	gameController.playNextLevel(table);
}

function playPreviousLevel(table) {
	gameController.playPreviousLevel(table);
}

function resetPresentLevel(table) {
	gameController.resetPresentLevel(table);
}
//FIXME - undoMove is odd one out here
function undoMove() {
	gameController.undoMove();
}
