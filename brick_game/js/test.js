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
 

// script file to test some basic functions.

var globalObjectMap = null;

function initializeGame() {
	var initialPusherPosition = new Position(2, 2);
	var mazeDimension = new MazeDimension(4, 4);
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
	this.LEFT_ARROW = "LEFT-ARROW";
	this.UP_ARROW = "UP-ARROW";
	this.RIGHT_ARROW = "RIGHT-DOWN";
	this.DOWN_ARROW = "DOWN-ARROW";
	
	// constants for class names
	this.BRICK_MOVER = 'brick_mover';
	this.BRICK = 'brick';
	this.EMPTY_SPACE = 'empty_space';
	this.DESTINATION = 'destination';
}

// method to move when arrow ley is pressed.
function moveOnArrowPress() {
	$(document).keydown(function(event){
		var keyCode = (event.keyCode ? event.keyCode : event.which);
		var keyName = getArrowKeyPressed(keyCode);
		movePusherObject(keyName);
		displayPusherPosition();
	});
}

function movePusherObject(keyName) {
	var pusher = globalObjectMap.pusher;
	if (keyName != null) {
		if (keyName == globalObjectMap.LEFT_ARROW) {
			pusher.moveLeft();
		}
		else if (keyName == globalObjectMap.UP_ARROW) {
			pusher.moveUp();
		}
		else if (keyName == globalObjectMap.RIGHT_ARROW) {
			pusher.moveRight();
		}
		else if (keyName == globalObjectMap.DOWN_ARROW) {
			pusher.moveDown();
		}
	}
}

function displayPusherPosition() {
	var position =globalObjectMap.pusher.position;
	$('#x-position').text('x-position ' + position.x_pos);
	$('#y-position').text('y-position ' + position.y_pos);
}