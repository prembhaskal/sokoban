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



function menuAction()
{
    gameController.menuAction();
}
function init()
{
	initializeGame(getTable());
}

function startNextLevel() {
	playNextLevel(getTable());
}

function startPreviousLevel() {
	playPreviousLevel(getTable());
}

function replayPresentLevel() {
	resetPresentLevel(getTable());
}

function undo() {
	undoMove();
}

function getTable() {
    return SokobanUtil.getTable();
}

function showModalWindow() {
	showPopUp();
}

function hideModalWindow() {
	hidePopUp();
}

function addOnClickListener(elementId, clickListener) {
	if(document.getElementById(elementId) !=undefined)
	    document.getElementById(elementId).addEventListener('click', clickListener, false);
}

// Add all the event listeners below
$(document).ready(function() {
	window.addEventListener('load', init, false);
    // showWindow is used only for test purpose.
	addOnClickListener('showWindow', showModalWindow);
	addOnClickListener('button_popup_pre_level', startPreviousLevel);
	addOnClickListener('button_popup_next_level', startNextLevel);
	addOnClickListener('button_popup_reset_level', replayPresentLevel);
	addOnClickListener('button_pre_level', startPreviousLevel);
	addOnClickListener('button_next_level', startNextLevel);
	addOnClickListener('button_reset_level', replayPresentLevel);
	addOnClickListener('button_undo_move', undo);
	addOnClickListener('menubtn', menuAction);
});



