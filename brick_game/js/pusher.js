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
