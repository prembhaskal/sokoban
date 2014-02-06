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

function undoMove() {
	gameController.undoMove();
}

function hidePopUp() {
	SokobanUtil.hidePopUp();
}


function showPopUp() {
	SokobanUtil.displayPopUp();
}