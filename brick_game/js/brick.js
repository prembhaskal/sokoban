	
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
	
