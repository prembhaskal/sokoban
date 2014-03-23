//TODO -Remove unnecessary comments

var gameController = null;

function initializeGame(table) {
	gameController = new GameController();
	gameController.initializeGame(table);
}

function playNextLevel(table) {
	gameController.playNextLevel(table);
	hidePopUp();
}

function playPreviousLevel(table) {
	gameController.playPreviousLevel(table);
	hidePopUp();
}

function resetPresentLevel(table) {
	gameController.resetPresentLevel(table);
	hidePopUp();
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