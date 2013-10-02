//TODO -Remove unnecessary comments

var globalObjectMap = null;
var canvas = null;
var log = null;
var maxLevels = 2;
var presentLevel = null;

function initializeGame(table) {
	
	//TODO - Find the use case of debug else remove the logger functionality
	var div = document.getElementById("footer");
	initializeLogger(div);
	
	presentLevel = 1;
	startLevel(presentLevel, table);
	
	//binding key handlers
	addkeyHandlers();
	
}

function startLevel(levelNo, table) {

	var allMazeLevels = new AllMazeLevels();
	var rawMaze = allMazeLevels.getRawMaze(levelNo);
	
	var mazeCreator = new MazeCreator();
	var maze = mazeCreator.createMaze(rawMaze);
	var canvasDrawer = new CanvasDrawer();
	canvasDrawer.drawMaze(maze, table);
	
	var pusher = maze.pusher;
	for(var i=0; i < maze.brickArray.length ; i++)
	{
		pusher.addPushListener(maze.brickArray[i]);
	}
	
	globalObjectMap = new GlobalObjectMap();
	globalObjectMap.maze = maze;
}

function playNextLevel(table) {
	if (presentLevel < maxLevels) {
		presentLevel++;
		startLevel(presentLevel, table);
	}
}

function playPreviousLevel(table) {
	if (presentLevel > 1) {
		presentLevel--;
		startLevel(presentLevel, table);
	}
}

function addkeyHandlers() {
	moveOnArrowPress();
}

// global object map
function GlobalObjectMap() {
	this.maze = null;
	//this.current_position = null;
	//**this.brickObjects = new Array();
	
	// constants for arrows
}

// method to move when arrow key is pressed.
function moveOnArrowPress() {
	$(document).keydown(function(event){
		var keyCode = (event.keyCode ? event.keyCode : event.which);
		var keyName = SokobanUtil.getArrowKeyPressed(keyCode);

		movePusherObject(keyName);
		
	});
}

function movePusherObject(keyName) {
	var pusher = globalObjectMap.maze.pusher;
	if (keyName != null) {
		pusher.move(keyName);
	}
}


