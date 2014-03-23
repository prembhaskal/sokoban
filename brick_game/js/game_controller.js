// Game Controller.
function GameController() {

	// variables containing the game/level information
	var maxLevels = 8;
	var presentLevel = null;
	// put a new undo stack for moves.
	var undoStack = null;
	var maze = null;

	var isGameComplete = null;
	var keysEnabled = null;
	var keyCodeZ = 90;

	// see http://www.crockford.com/javascript/private.html
	// needed to preserve the object reference in private methods.... stupid ECMA :(
	var thisObject = this;

	// local methods

	// method to move when arrow key is pressed.
	function moveOnArrowPress() {
		$(document).keydown(function (event) {
			var keyCode = (event.keyCode ? event.keyCode : event.which);
			
			var keyName = SokobanUtil.getArrowKeyPressed(keyCode);

			if (!isKeyPressEnabled())
				return;

			// don't do anything if some other key is pressed.
			if (keyName == null)
				return;

			movePusherObject(keyName);
			checkIfGameIsComplete();
		});
	}
	
	// check if control + z is pressed, then undo
	function undoOnCtrlZ() {
		$(document).keydown(function (event) {
			var keyCode = (event.keyCode ? event.keyCode : event.which);

			if (!isKeyPressEnabled())
				return;

			if (event.ctrlKey && keyCode == keyCodeZ) {
				undoMove();
			}
		});
	}

	function isKeyPressEnabled() {
		return keysEnabled;
	}

	function movePusherObject(keyName) {
		if (!keysEnabled)
			return;

		var pusher = maze.pusher;
		if (keyName != null) {
			pusher.move(keyName);
		}

		SokobanUtil.updateTotalMoves(maze.pusher.getTotalMoves());
	}

	function checkIfGameIsComplete() {
		if (areAllBricksOnDestination()) {
			isGameComplete = true;
			keysEnabled = false;
			SokobanUtil.showLevelCompleteMsg();
			//TODO add may be a delay before showing the pop up.
			SokobanUtil.displayPopUp();
			thisObject.updateUndoResetButton();
		}
	}

	function areAllBricksOnDestination() {
		var brickArray = maze.brickArray;
		var areAllBricksOnDest = true;
		for (var i = 0; i < brickArray.length; i++) {
			var brick = brickArray[i];
			var isBrickOnDest = SokobanUtil.isDestination(brick.getPosition());
			if (!isBrickOnDest) {
				areAllBricksOnDest = false;
				break;
			}
		}

		return areAllBricksOnDest;
	}

	function undoThisMove(gameMove) {
		var cell = gameMove.cell;
		cell.undoMove(gameMove.xinc, gameMove.yinc);
	}

	function initializeStuffForLevel() {
		// reset the undo stack.
		undoStack = new Array();
		// set completed false
		isGameComplete = false;
		// enable keys
		keysEnabled = true;

		initializeLevelViews();
	}

	function initializeLevelViews() {
		// level completion message
		SokobanUtil.resetLevelCompleteMsg();
		// initialize total moves.
		SokobanUtil.updateTotalMoves(0);
		thisObject.updateUndoResetButton();
	}

	function startLevel(levelNo, table) {
		initializeStuffForLevel();
		var allMazeLevels = new AllMazeLevels();
		var rawMaze = allMazeLevels.getRawMaze(levelNo);

		var mazeCreator = new MazeCreator();
		maze = mazeCreator.createMaze(rawMaze);
		var canvasDrawer = new CanvasDrawer();
		canvasDrawer.drawMaze(maze, table);

		// add appropriate listeners
		var pusher = maze.pusher;

		var movesListener = new MovesListener(thisObject);
		pusher.addMoveListeners(movesListener);

		for (var i = 0; i < maze.brickArray.length; i++) {
			pusher.addPushListener(maze.brickArray[i]);
			maze.brickArray[i].addMoveListeners(movesListener);
		}
		
		SokobanUtil.showLevel(levelNo);
		updatePreviousNextButtons();
	}
	
	function addKeyHandlers() {
		moveOnArrowPress();
		undoOnCtrlZ();
	};

	function updatePreviousNextButtons() {
		SokobanUtil.enablePreviousLevelButton();
		SokobanUtil.enableNextLevelButton();
		if (presentLevel == maxLevels) {
			SokobanUtil.disableNextLevelButton();
		}
		if (presentLevel == 1) {
			SokobanUtil.disablePreviousLevelButton();
		}
	};

	// privileged methods.

	this.updateUndoResetButton = function() {
		if (isGameComplete) {
			SokobanUtil.disableUndoButton();
		}
		else if (undoStack.length == 1) {
			SokobanUtil.enableUndoButton();
			SokobanUtil.enableResetButton();
		}
		else if (undoStack.length == 0) {
			SokobanUtil.disableUndoButton();
			SokobanUtil.disableResetButton();
		}

	}

	this.initializeGame = function (table) {

		presentLevel = 1;
		startLevel(presentLevel, table);

		//binding key handlers
		addKeyHandlers();
	};

	this.playNextLevel = function (table) {
		if (presentLevel < maxLevels) {
			presentLevel++;
			startLevel(presentLevel, table);
		}
	};

	this.playPreviousLevel = function (table) {
		if (presentLevel > 1) {
			presentLevel--;
			startLevel(presentLevel, table);
		}
	};

	this.resetPresentLevel = function (table) {
		startLevel(presentLevel, table);
	};

	this.undoMove = function () {
		var gameMove = undoStack.pop();

		// return if nothing is present to undo.
		if (gameMove == null) {
			return;
		}

		// move the pusher...it has to be a pusher... no check required.
		undoThisMove(gameMove);
		SokobanUtil.updateTotalMoves(maze.pusher.getTotalMoves());
		this.updateUndoResetButton();

		// check to see if a brick was also moved along with the pusher.
		gameMove = undoStack.pop();
		if (gameMove == null) {
			return;
		}

		var cellType = gameMove.cell.getCellType();
		if (cellType == SokobanUtil.CellType.BrickType) {
			undoThisMove(gameMove);
		} else {
			// else we popped a pusher,  so put it back as it is for the next move.
			undoStack.push(gameMove);
		}
	};

	this.addToUndo = function (gameMove) {
		if (gameMove != null) {
			undoStack.push(gameMove);
		}
	};

}

/**
 * moves listener to keep track of the moves to facilitate the undo operation.
 */
function MovesListener(gameController) {

	this.onEvent = function (gameMove) {
		gameController.addToUndo(gameMove);
		gameController.updateUndoResetButton();
	};
}

