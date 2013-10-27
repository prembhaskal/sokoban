// Game Controller.
function GameController() {

	var maxLevels = 2;
	var presentLevel = null;
	// put a new undo stack for moves.
	var undoStack = null;
	var maze = null;

	// local methods

	// method to move when arrow key is pressed.
	function moveOnArrowPress() {
		$(document).keydown(function (event) {
			var keyCode = (event.keyCode ? event.keyCode : event.which);
			var keyName = SokobanUtil.getArrowKeyPressed(keyCode);

			movePusherObject(keyName);
		});
	}

	function movePusherObject(keyName) {
		var pusher = maze.pusher;
		if (keyName != null) {
			pusher.move(keyName, function registerMove(gameMove) {
								undoStack.push(gameMove);
							}
			);
		}
	}

	function undoThisMove(gameMove) {
		var cell = gameMove.cell;
		cell.undoMove(gameMove.xinc, gameMove.yinc);
	}

	function startLevel(levelNo, table) {
		// reset the undo stack.
		undoStack = new Array();

		var allMazeLevels = new AllMazeLevels();
		var rawMaze = allMazeLevels.getRawMaze(levelNo);

		var mazeCreator = new MazeCreator();
		maze = mazeCreator.createMaze(rawMaze);
		var canvasDrawer = new CanvasDrawer();
		canvasDrawer.drawMaze(maze, table);

		var pusher = maze.pusher;
		for (var i = 0; i < maze.brickArray.length; i++) {
			pusher.addPushListener(maze.brickArray[i]);
		}

		SokobanUtil.showLevel(levelNo);
	};

	// privileged methods.

	this.initializeGame = function (table) {
		//TODO - Find the use case of debug else remove the logger functionality
		var div = document.getElementById("footer");
		initializeLogger(div);

		presentLevel = 1;
		startLevel(presentLevel, table);

		//binding key handlers
		this.addKeyHandlers();
	};

	this.addKeyHandlers = function () {
		moveOnArrowPress();
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

}
