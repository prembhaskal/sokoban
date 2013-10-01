// Util functions 


function SokobanUtil(){}

//Global Variables
SokobanUtil.keyCode = {LEFT_ARROW:"LEFT-ARROW",UP_ARROW:"UP-ARROW",RIGHT_ARROW:"RIGHT-DOWN",DOWN_ARROW:"DOWN-ARROW"};

SokobanUtil.cellStyle = {BRICK_MOVER :'brick_mover',BRICK : 'brick',EMPTY_SPACE : 'empty_space',DESTINATION :'destination',IMMOVABLE:"immovable"};


SokobanUtil.CellType =  {BrickType : "brick", 
		 StoneType : "immovable", 
		 PusherType : "brick_mover", 
		 DestinationType : "destination",
		 EmptySpaceType: "empty_space"};


//CSS related
SokobanUtil.changeClassOfElement= function (elementId, className)
{
	elementId = '#'+elementId;
	$(elementId).addClass(className);
}

SokobanUtil.changeClassOFElementByPosition = function (position,className)
{
	var x_pos = position.x_pos;
	var y_pos = position.y_pos;
	var elementId = 'col_' + x_pos + '_' + y_pos;
	SokobanUtil.changeClassOfElement(elementId,className);

}

SokobanUtil.removeClassOfElement= function (elementId, className)
{
	elementId = '#'+elementId;
	$(elementId).removeClass(className);
}
SokobanUtil.removeClassOFElementByPosition = function (position,className)
{
	var x_pos = position.x_pos;
	var y_pos = position.y_pos;
	var elementId = 'col_' + x_pos + '_' + y_pos;
	SokobanUtil.removeClassOfElement(elementId,className);
}

SokobanUtil.getCellType = function(position)
{
	var x_pos = position.x_pos;
	var y_pos = position.y_pos;
	var elementId = '#col_' + x_pos + '_' + y_pos;
	
	if($(elementId).hasClass(SokobanUtil.cellStyle.IMMOVABLE))
		return SokobanUtil.CellType.StoneType;
	else if($(elementId).hasClass(SokobanUtil.cellStyle.BRICK))
		return SokobanUtil.CellType.BrickType;
	else
		return SokobanUtil.CellType.EMPTY_SPACE;
	
	
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
}

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
	
}

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
	
}
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
			cell.innerHTML="col_"+xpos+"_"+ypos;;
		}
	}

}

