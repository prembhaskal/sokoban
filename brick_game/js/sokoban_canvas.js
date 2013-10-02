function CanvasDrawer() {
	// draws the maze on the given table.
	this.drawMaze = function (maze, table) {
		var mazeDimension = maze.mazeDimension;
		
		// generate table
		SokobanUtil.generateTable(mazeDimension.width, mazeDimension.height, table);
		
		// draw the static maze first.
		drawStaticItems(maze.cellArray, mazeDimension);
		
		// draw the movable items on top of that.
		drawMoveableItems(maze, table);
		
	};
	
	function drawStaticItems (cellArray, mazeDimension) {
		for (var i = 0; i < mazeDimension.height; i++) {
			for (var j = 0; j < mazeDimension.width; j++) {
				var cell = cellArray[i][j];
				drawCell(cell);
			}
		}
	}
	
	function drawMoveableItems (maze) {
		// draw pusher
		drawCell(maze.pusher);
		
		var brickArray = maze.brickArray;
		// draw bricks.
		for (var i = 0; i < brickArray.length; i++) {
			drawCell(brickArray[i]);
		}
	}
	
	function drawCell (cell) {
		SokobanUtil.changeClassOFElementByPosition(cell.getPosition(), cell.getCellType());
	}
}
