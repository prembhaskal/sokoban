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
	
	//TODO - Find the use point of debug else remove the logger functionality
	var div = document.getElementById("footer");
	initializeLogger(div);
	
	var maze_x = 4;
	var maze_y = 4;
	
	//For different levels we can choose random positions for the following drawable components
	//TODO - Change type of drawDefinedCanvas to accept array of Destinations and array of Bricks so that we can have dynamic
	//number of bricks and destinations
	var initialPusherPosition = new Position(2, 2);
	//
	var brickArray = new Array();
	var brick1Position = new Position(1,2);
	var brick2Position =  new Position(2,1)
	brickArray.push(brick1Position );
	brickArray.push(brick2Position);

	var destinationArray = new Array();
	destinationArray.push(new Position(0,3));
	destinationArray.push(new Position(0,0));
	
	var immovableArray = new Array();
	immovableArray.push(new Position(2,3));
	immovableArray.push(new Position(3,3));
	
	var mazeDimension = new MazeDimension(maze_x,maze_y);
	
	canvas = new SokobanCanvas(mazeDimension,table);
	canvas.drawDefinedMaze(initialPusherPosition,brickArray,destinationArray,immovableArray);
	
	var pusherObject = new Pusher(initialPusherPosition, mazeDimension);
	var brick1 = new Brick(brick1Position,mazeDimension);
	var brick2 = new Brick(brick2Position,mazeDimension);
	
	pusherObject.addPushListener(brick1);
	pusherObject.addPushListener(brick2);
	
	globalObjectMap = new GlobalObjectMap();
	globalObjectMap.pusher = pusherObject;
	
	globalObjectMap.brickObjects.push(brick1);
	globalObjectMap.brickObjects.push(brick2);
	
	//binding key handlers
	addkeyHandlers();
	
}

function addkeyHandlers() {
	moveOnArrowPress();
}

// global object map
function GlobalObjectMap() {
	this.pusher = null;
	this.current_position = null;
	this.brickObjects = new Array();
	
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
	var pusher = globalObjectMap.pusher;
	if (keyName != null) {
		pusher.move(keyName);
	}
}

