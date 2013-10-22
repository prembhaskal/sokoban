	
	//BRICK Object
	function Brick (position, cellId,mazeDimension) {
		
		var cellType = SokobanUtil.CellType.BrickType;
		this.position = position;
		this.mazeDimension = mazeDimension;
		
		this.getCellType = function() {
			return cellType;
		};
		
		this.getPosition = function() {
			return position;
		};
		
		this.cellId = function() {
			return cellId;
		};
		
		
		// privileged methods
		this.getNewXPosition = function(x_inc) {
			var old_x_pos = this.position.x_pos;
			var new_x_pos = old_x_pos + x_inc;
			// check if it is crossing boundary, both left and right.
			if ((new_x_pos < 0) || (new_x_pos >= this.mazeDimension.width)) {
				new_x_pos = old_x_pos;
			};
			return new_x_pos;
		};
		
		this.getNewYPosition = function(y_inc) {
			var old_y_pos = this.position.y_pos;
			var new_y_pos = old_y_pos + y_inc;
			// check if it is crossing boundary, both upper and lower
			if ((new_y_pos < 0) || (new_y_pos >= this.mazeDimension.height)) {
				new_y_pos = old_y_pos;
			}
			//check if we are entering empty space.
			return new_y_pos;
		};
		
		// move this BRICK
		 this.move = function(keyName, registerMove) {
			 var x_inc = SokobanUtil.keyXInc(keyName);
			 var y_inc = SokobanUtil.keyYInc(keyName);
			 
			// find the new position
			var oldPosition = this.position;
			var new_x_pos = this.getNewXPosition(x_inc);
			var new_y_pos = this.getNewYPosition(y_inc);
			var newPosition = new Position(new_x_pos, new_y_pos);
			
			var cellType = SokobanUtil.getCellType(newPosition);
			// return if new position is same as the original position
			if (oldPosition.equals(newPosition))
				return;
			else if((SokobanUtil.CellType.StoneType==cellType))
				return false;
			else if ((SokobanUtil.CellType.BrickType==cellType))
				return false;
			else
			{
				this.position = newPosition;
				//move the Brick to destination
				SokobanUtil.changeClassOFElementByPosition(newPosition, SokobanUtil.cellStyle.BRICK);
				
				// replace the original position with whatever was present below.
				SokobanUtil.removeClassOFElementByPosition(oldPosition, SokobanUtil.cellStyle.BRICK);
				
				// register this move
				if (registerMove != null) {
					var gameMove = new GameMove(this, x_inc, y_inc);
					registerMove(gameMove);
				}
				
				return true;
			}

			
		};
		
		// usually this method should not require any validation for movement.
		this.undoMove = function(x_inc, y_inc) {
            SokobanUtil.undoMove(this, x_inc, y_inc, SokobanUtil.cellStyle.BRICK);
		};

	}
