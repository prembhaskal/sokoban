// ***************** Creating Tables ****************************
function createTestMaze(table) 
{
	var allMazeLevels = new AllMazeLevels();
	var rawMaze = allMazeLevels.getRawMaze(1);
	var maze = new Maze(rawMaze.mazeDimension, rawMaze.mazeStructure);
	maze.init();
	
	createMazeUsingLevel(maze, table);
}

function createMazeUsingLevel(maze, table)
{
	var canvas = new SokobanCanvas(maze.mazeDimension, table);
	canvas.drawDefinedMaze(maze.pusherPosition, maze.brickArray,
						   maze.destinationArray, maze.immovableArray);
}
