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

// uses jquery inside
function changeClassOfElement(elementId, className) {
	elementId = '#'+elementId;
	$(elementId).removeClass();
	$(elementId).addClass(className);
}

function addkeyHandlers() {
	moveOnArrowPress();
}

function alertOnArrowKey() {
	$(document).keydown(function(event){
		var keyCode = (event.keyCode ? event.keyCode : event.which);
		var keyName = getArrowKeyPressed(keyCode);
		if(keyName != null) {
			alert(keyName);
		}
	});
}

// *********************** Object Position ***************************
// object function to store co-ordinates
// 0 based position
function Position(x_pos, y_pos) {
	this.x_pos = x_pos;
	this.y_pos = y_pos;
}

Position.prototype.equals = function(otherPosition) {
	if(! (otherPosition instanceof Position))
		return false;
	if (otherPosition.x_pos != this.x_pos)
		return false;
	if (otherPosition.y_pos != this.y_pos)
		return false;
	return true;
};



// object to define the maze dimensions.
function MazeDimension(width, height) {
	this.width = width;
	this.height = height;
}

//  *********************** Object PUSHER ***************************** 
function Pusher(position, mazeDimension) {
	this.position = position;
	this.mazeDimension = mazeDimension;
	
	// privileged methods
	this.getNewXPosition = function(x_inc) {
//		alert("get x position called");
		var old_x_pos = this.position.x_pos;
		var new_x_pos = old_x_pos + x_inc;
		// check if it is crossing boundary, both left and right.
		if ((new_x_pos < 0) || (new_x_pos >= this.mazeDimension.width)) {
			new_x_pos = old_x_pos;
		};
		return new_x_pos;
	};
	
	this.getNewYPosition = function(y_inc) {
//		alert("get y position called");
		var old_y_pos = this.position.y_pos;
		var new_y_pos = old_y_pos + y_inc;
		// check if it is crossing boundary, both upper and lower
		if ((new_y_pos < 0) || (new_y_pos >= this.mazeDimension.height)) {
			new_y_pos = old_y_pos;
		}
		return new_y_pos;
	};
	
	this.elementIdForPosition = function(position) {
		var x_pos = position.x_pos;
		var y_pos = position.y_pos;
		var elementId = 'col_' + x_pos + '_' + y_pos;
		return elementId;
	};

}
	
	// move this PUSHER
	 Pusher.prototype.move = function(x_inc, y_inc) {
//		 alert("pusher move method called");
		 
		// find the new position
		var oldPosition = this.position;
		var new_x_pos = this.getNewXPosition(x_inc);
		var new_y_pos = this.getNewYPosition(y_inc);
		var newPosition = new Position(new_x_pos, new_y_pos);
		this.position = newPosition;
//		alert("x-position " + new_x_pos);
		
		// move to new position if it is different than original position
		if ( ! oldPosition.equals(newPosition)) {
			//move the Pusher to destination
			var destinationElemId = this.elementIdForPosition(newPosition);
			changeClassOfElement(destinationElemId, globalObjectMap.BRICK_MOVER);
			
			// replace the original position with empty space
			var sourceElemId = this.elementIdForPosition(oldPosition);
			changeClassOfElement(sourceElemId, globalObjectMap.EMPTY_SPACE);
		}
	};
	
	Pusher.prototype.moveLeft = function() {
		this.move(-1, 0);
	};
	
	Pusher.prototype.moveUp = function() {
		this.move(0, 1);
	};
	
	Pusher.prototype.moveRight = function() {
		this.move(1, 0);
	};
	
	Pusher.prototype.moveDown = function() {
		this.move(0, -1);
	};
	
	
	// *********************** End of object PUSHER ************************
	
	// *********************** Brick Object ********************************
	function Brick (position, mazeDimension) {
		this.position = position;
		this.mazeDimension = mazeDimension;
		
		// privileged methods
		this.getNewXPosition = function(x_inc) {
//			alert("get x position called");
			var old_x_pos = this.position.x_pos;
			var new_x_pos = old_x_pos + x_inc;
			// check if it is crossing boundary, both left and right.
			if ((new_x_pos < 0) || (new_x_pos >= this.mazeDimension.width)) {
				new_x_pos = old_x_pos;
			};
			return new_x_pos;
		};
		
		this.getNewYPosition = function(y_inc) {
//			alert("get y position called");
			var old_y_pos = this.position.y_pos;
			var new_y_pos = old_y_pos + y_inc;
			// check if it is crossing boundary, both upper and lower
			if ((new_y_pos < 0) || (new_y_pos >= this.mazeDimension.height)) {
				new_y_pos = old_y_pos;
			}
			return new_y_pos;
		};
		
		this.elementIdForPosition = function(position) {
			var x_pos = position.x_pos;
			var y_pos = position.y_pos;
			var elementId = 'col_' + x_pos + '_' + y_pos;
			return elementId;
		};
		
		this.prototype.isPositionEmpty = function (position) {
			var elementId = this.elementIdForPosition(position);
			var className = $('#' + elementId).attr('class');
			if (className == globalObjectMap.EMPTY_SPACE) {
				return true;
			}
			return false;
		};
	}
	
	Brick.prototype.canMove = function(x_inc, y_inc) {
		// get the present position
		var oldPosition = this.position;
		var new_x_pos = this.getNewXPosition(x_inc);
		var new_y_pos = this.getNewYPosition(y_inc);
		var newPosition = new Position(new_x_pos, new_y_pos);
		
		// check if newPostion is different from old one.
		if (oldPosition.equals(newPosition)) {
			return false; // it means we hit a dead end
		} else {
			return this.isPositionEmpty(newPosition);
		}
	};
	
	Brick.prototype.move = function(x_inc, y_inc) {
		// get the present position
		var oldPosition = this.position;
		var new_x_pos = this.getNewXPosition(x_inc);
		var new_y_pos = this.getNewYPosition(y_inc);
		var newPosition = new Position(new_x_pos, new_y_pos);
		
		// check if newPostion is different from old one.
		if (!oldPosition.equals(newPosition)) {
			//move the Pusher to destination
			var destinationElemId = this.elementIdForPosition(newPosition);
			changeClassOfElement(destinationElemId, globalObjectMap.BRICK);
			
			// replace the original position with empty space
			var sourceElemId = this.elementIdForPosition(oldPosition);
			changeClassOfElement(sourceElemId, globalObjectMap.EMPTY_SPACE);
		}
	};
	
	
	// **********************End of object Brick ***************************
	
	// testing the global variable
	var testGlobalVariable = 0;
	
	// initialize the global object map
	var globalObjectMap = initializeGame();
	
	function initializeGame() {
		var initialPusherPosition = new Position(2, 2);
		var mazeDimension = new MazeDimension(4, 4);
		var pusherObject = new Pusher(initialPusherPosition, mazeDimension);
		var globalObjectMap = new GlobalObjectMap();
		globalObjectMap.pusher = pusherObject;
		return globalObjectMap; 
	}
	
	function incrementGlobalVariable() {
		testGlobalVariable++;
		alert('value of global variable is ' && testGlobalVariable);
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
	

	function getArrowKeyPressed(keyCode) {
		if(keyCode == '37') {
			return globalObjectMap.LEFT_ARROW;
		}
		else if (keyCode == '38') {
			return globalObjectMap.UP_ARROW;
		}
		else if (keyCode == '39') {
			return globalObjectMap.RIGHT_ARROW;
		} 
		else if (keyCode == '40') {
			return globalObjectMap.DOWN_ARROW;
		} 
		else {
			return null;
		}
	}


// method to move when arrow ley is pressed.
function moveOnArrowPress() {
	$(document).keydown(function(event){
		var keyCode = (event.keyCode ? event.keyCode : event.which);
		var keyName = getArrowKeyPressed(keyCode);
		movePusherObject(keyName);
		displayPusherPosition();
//		alert(keyName);
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