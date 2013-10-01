//  *********************** Object PUSHER ***************************** 
function Pusher(position, mazeDimension) {
	this.position = position;
	this.mazeDimension = mazeDimension;
	this.pushListeners= new Array();
	
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
	
	// move this PUSHER
	 this.move = function(keyName) {
		 var x_inc = SokobanUtil.keyXInc(keyName);
		 var y_inc = SokobanUtil.keyYInc(keyName);
		 
		// find the new position
		var oldPosition = this.position;
		var new_x_pos = this.getNewXPosition(x_inc);
		var new_y_pos = this.getNewYPosition(y_inc);
		var newPosition = new Position(new_x_pos, new_y_pos);
		
		var cellType = SokobanUtil.getCellType(newPosition);
		
		if((SokobanUtil.CellType.StoneType==cellType))
			return;
		//else if (SokobanUtil.CellType.BRICK == cellType)
			
		else
		{
			this.position = newPosition;
			// move to new position if it is different than original position
			if ( ! oldPosition.equals(newPosition)) {
				//move the Pusher to destination
				SokobanUtil.changeClassOFElementByPosition(newPosition, SokobanUtil.cellStyle.BRICK_MOVER);
				
				// replace the original position with empty space
				SokobanUtil.removeClassOFElementByPosition(oldPosition, SokobanUtil.cellStyle.BRICK_MOVER);
			}
		}

		
	};
	
	
	
	//TODO - Currently the element is position , if infuture the object is changed then we will be needing to grope in to the object and 
	//fetch the position element
	this.addPushListener = function(element)
	{
		pushListeners.add(element);
	}
	this.removePushListener = function(element)
	{
		for(var i =0;i < pushListeners.length; i++)
		{
			var item = pushListeners[i];
			if(item.equals(element))
			{
				pushListeners.splice(i,1);
			}
		}
	}
	
	this.onPush = function(element)
	{
		for(var i =0;i < pushListeners.length; i++)
		{
			var item = pushListeners[i];
			if(item.equals(element))
			{
				return item.move()
			}
		}
	}
	


}
	

	
		
	// *********************** End of object PUSHER ************************
