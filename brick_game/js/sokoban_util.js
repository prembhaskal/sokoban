// Util functions 
//TODO - Wrap dangling util functions to SokobanUtil class
function changeClassOfElement(elementId, className) {
	elementId = '#'+elementId;
	$(elementId).removeClass();
	$(elementId).addClass(className);
}

function changeClassOFElementByPosition(position,className)
{
	var x_pos = position.x_pos;
	var y_pos = position.y_pos;
	var elementId = 'col_' + x_pos + '_' + y_pos;
	changeClassOfElement(elementId,className);

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

function generateTable(x,y,table)
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

