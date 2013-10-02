/*
 * Copyright (C) 2012 Premkumar Bhaskal
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Library General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, see <http://www.gnu.org/licenses/>.
 */
 
//TODO -Remove unnecessay comments

var globalObjectMap = null;
var canvas = null;
var log = null;
function initializeGame(table) {
	
	//TODO - Find the use case of debug else remove the logger functionality
	var div = document.getElementById("footer");
	initializeLogger(div);
	

	var allMazeLevels = new AllMazeLevels();
	var rawMaze = allMazeLevels.getRawMaze(2);
	
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
	//binding key handlers
	addkeyHandlers();
	
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

