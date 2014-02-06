// Util functions 


function SokobanUtil(){}

//Global Variables
SokobanUtil.keyCode = {LEFT_ARROW:"LEFT-ARROW",UP_ARROW:"UP-ARROW",RIGHT_ARROW:"RIGHT-DOWN",DOWN_ARROW:"DOWN-ARROW"};

SokobanUtil.cellStyle = {BRICK_MOVER :'brick_mover',BRICK : 'brick',EMPTY_SPACE : 'empty_space',
						 DESTINATION :'destination',IMMOVABLE:'immovable', GREENERY : 'immovable'};


SokobanUtil.CellType =  {BrickType : "brick", 
		 StoneType : "immovable", 
		 PusherType : "brick_mover", 
		 DestinationType : "destination",
		 EmptySpaceType: "empty_space",
		 Greenery  : "greenery"};


//CSS related
SokobanUtil.changeClassOfElement= function (elementId, className)
{
	$(elementId).addClass(className);
};

SokobanUtil.changeClassOFElementByPosition = function (position,className)
{
	var elementId = this.getElementId(position);
	SokobanUtil.changeClassOfElement(elementId,className);

};

SokobanUtil.removeClassOfElement= function (elementId, className)
{
	$(elementId).removeClass(className);
};
SokobanUtil.removeClassOFElementByPosition = function (position,className)
{
	var elementId = this.getElementId(position);
	SokobanUtil.removeClassOfElement(elementId,className);
};

SokobanUtil.getCellType = function(position)
{
	var elementId = this.getElementId(position);
	if($(elementId).hasClass(SokobanUtil.cellStyle.IMMOVABLE))
		return SokobanUtil.CellType.StoneType;
	else if($(elementId).hasClass(SokobanUtil.cellStyle.BRICK))
		return SokobanUtil.CellType.BrickType;
	else
		return SokobanUtil.CellType.EMPTY_SPACE;
};

SokobanUtil.isDestination = function (position) {
	var elementId = this.getElementId(position);
	if ($(elementId).hasClass(SokobanUtil.cellStyle.DESTINATION))
		return true;
	return false;
};

SokobanUtil.getElementId = function (position) {
	var x_pos = position.x_pos;
	var y_pos = position.y_pos;
	var elementId = '#col_' + x_pos + '_' + y_pos;

	return elementId;
}

SokobanUtil.getDOMId = function (position) {
	var x_pos = position.x_pos;
	var y_pos = position.y_pos;
	var elementId = 'col_' + x_pos + '_' + y_pos;

	return elementId;
}
//Input related
SokobanUtil.getArrowKeyPressed = function (keyCode) {
	if(keyCode == '37') {
		return SokobanUtil.keyCode.LEFT_ARROW;
	}
	else if (keyCode == '38') {
		return SokobanUtil.keyCode.UP_ARROW;
	}
	else if (keyCode == '39') {
		return SokobanUtil.keyCode.RIGHT_ARROW;
	} 
	else if (keyCode == '40') {
		return SokobanUtil.keyCode.DOWN_ARROW;
	} 
	else {
		return null;
	}
};

SokobanUtil.keyXInc = function(keyName)
{
	if(keyName==SokobanUtil.keyCode.LEFT_ARROW)
	{
		return -1;
	}
	else if(keyName==SokobanUtil.keyCode.UP_ARROW)
	{
		return 0;
	}
	else if(keyName==SokobanUtil.keyCode.RIGHT_ARROW)
	{
		return 1;
	}
	else if(keyName==SokobanUtil.keyCode.DOWN_ARROW)
	{
		return 0;
	}
	
};

SokobanUtil.keyYInc = function(keyName)
{
	if(keyName==SokobanUtil.keyCode.LEFT_ARROW)
	{
		return 0;
	}
	else if(keyName==SokobanUtil.keyCode.UP_ARROW)
	{
		return 1;
	}
	else if(keyName==SokobanUtil.keyCode.RIGHT_ARROW)
	{
		return 0;
	}
	else if(keyName==SokobanUtil.keyCode.DOWN_ARROW)
	{
		return -1;
	}
	
};
SokobanUtil.generateTable = function (x,y,table)
{
	table.rows.length = 0;
	var ypos = y-1;
	
	for(;ypos >=0;ypos--)
	{
		//alert("y"+ypos);
		var row = table.insertRow(table.rows.length);
		row.id = "row"+ypos;
		var xpos =0;
		for(;xpos <x; xpos++ )
		{
			//alert(xpos);
			var cell = row.insertCell(row.cells.length);
			cell.id="col_"+xpos+"_"+ypos;
			cell.className = "empty_space";
			cell.innerHTML="";
			//cell.style="color:red";
		}
	}

};

SokobanUtil.recreateTable = function (x, y, table) {
	
	// remove existing rows if any.
	var rowLength = table.rows.length;
	for (var i = 0; i < rowLength; i++) {
		table.deleteRow(0);
	}
	
	SokobanUtil.generateTable(x, y, table);
};

SokobanUtil.undoMove = function(cell, xinc, yinc, cellStyle) {
    xinc = xinc * (-1);
    yinc = yinc * (-1);

    var newXPos = cell.getNewXPosition(xinc);
    var newYPos = cell.getNewYPosition(yinc);

    var oldPosition = cell.position;
    var newPosition = new Position(newXPos, newYPos);

    // move the cell back

    //move the Pusher to destination
    SokobanUtil.changeClassOFElementByPosition(newPosition, cellStyle);

    // replace the original position with whatever was present below.
    SokobanUtil.removeClassOFElementByPosition(oldPosition, cellStyle);

    cell.position = newPosition;

};


SokobanUtil.showLevel = function (levelNo) {
    var levelInfo = "LEVEL : " + levelNo;
    $("#level_no").text(levelInfo);
};

SokobanUtil.showLevelCompleteMsg = function () {
	var levelComplete = "!!!!!!!!!! LEVEL COMPLETE !!!!!!!!!!";
	$("#level_completion").html(levelComplete);
};

SokobanUtil.resetLevelCompleteMsg = function () {
	var emptySpaceHolder = "&nbsp;";
	$("#level_completion").html(emptySpaceHolder);
};

SokobanUtil.updateTotalMoves = function(totalMoves) {
	$("#total_moves").text(totalMoves);
};

SokobanUtil.disableUndoButton = function() {
	$("#button_undo_move").attr('disabled', true);
}

SokobanUtil.enableUndoButton = function() {
	$("#button_undo_move").removeAttr('disabled');
}


SokobanUtil.disableResetButton = function() {
	$("#button_reset_level").attr('disabled', true);
}

SokobanUtil.enableResetButton = function() {
	$("#button_reset_level").removeAttr('disabled');
}

