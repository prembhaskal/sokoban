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
	brickArray.push( new Position(1,2));
	brickArray.push( new Position(2,1));

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
	globalObjectMap = new GlobalObjectMap();
	globalObjectMap.pusher = pusherObject;
	
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
		if (keyName == SokobanUtil.keyCode.LEFT_ARROW) {
			pusher.moveLeft();
		}
		else if (keyName == SokobanUtil.keyCode.UP_ARROW) {
			pusher.moveUp();
		}
		else if (keyName == SokobanUtil.keyCode.RIGHT_ARROW) {
			pusher.moveRight();
		}
		else if (keyName == SokobanUtil.keyCode.DOWN_ARROW) {
			pusher.moveDown();
		}
	}
}

