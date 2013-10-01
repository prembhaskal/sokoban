function SokobanCanvas(mazeDimension,table)
{
	this.mazeDimesion=mazeDimension;
	this.table = table;
	//TODO - Arrays as input for bricks and destinations
	this.drawDefinedMaze = function(pusherPos,brickArray,destinationArray,immovableArray)
	{
		SokobanUtil.generateTable(mazeDimension.width,mazeDimension.height,table);
		
		for(var i =0;i < brickArray.length;i++)
		{
			drawBrick(brickArray[i]);
		}
		
		for(var i =0;i < destinationArray.length;i++)
		{
			drawDestination(destinationArray[i]);
		}
		
		for(var i =0;i < immovableArray.length;i++)
		{
			drawImmovable(immovableArray[i]);
		}	
		
		drawPusher(pusherPos);
		
		
	};
	
	this.drawRandomMaze = function()
	{
		//TODO
	};
	
	//private functions
	function drawDestination(destination)
	{
		SokobanUtil.changeClassOFElementByPosition(destination,"destination");
	}
	
	function drawBrick(brickPos)
	{
		SokobanUtil.changeClassOFElementByPosition(brickPos,"brick");
	}
	function drawPusher(pusherPos)
	{
		SokobanUtil.changeClassOFElementByPosition(pusherPos,"brick_mover");
	}
	function drawImmovable(immovablePos)
	{
		SokobanUtil.changeClassOFElementByPosition(immovablePos,"immovable");
	}

}

function CanvasDrawer() {
	// draws the maze on the given table.
	this.drawMaze = function (maze, table) {
		var mazeDimension = maze.mazeDimension;
		
		// generate table
		SokobanUtil.generateTable(mazeDimension.width,mazeDimension.height,table);
		
		var cellArray = maze.cellArray;
		
		for (var i = 0; i < mazeDimension.height; i++) {
			for (var j = 0; j < mazeDimension.width; j++) {
				var cell = cellArray[i][j];
				drawCell(cell);
			}
		}
		
	};
	
	function drawCell (cell) {
		SokobanUtil.changeClassOFElementByPosition(cell.getPosition(), cell.getCellType());
	}
}
