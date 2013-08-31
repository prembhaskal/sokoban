function SokobanCanvas(mazeDimension,table)
{
	this.mazeDimesion=mazeDimension;
	this.table = table;
	
	this.drawDefinedMaze = function(pusherPos,brick1Pos,brick2Pos,destination1,destination2)
	{
		generateTable(mazeDimension.width,mazeDimension.height,table);
		
		drawDestination(destination1);
		drawDestination(destination2);
		
		drawBrick(brick1Pos);
		drawBrick(brick2Pos);
		
		drawPusher(pusherPos);
	}
	
	this.drawRandomMaze = function()
	{
		//TODO
	}
	
	//private functions
	function drawDestination(destination)
	{
		changeClassOFElementByPosition(destination,"destination");
	}
	
	function drawBrick(brickPos)
	{
		changeClassOFElementByPosition(brickPos,"brick");
	}
	function drawPusher(pusherPos)
	{
		alert();
		changeClassOFElementByPosition(pusherPos,"brick_mover");
	}

}
