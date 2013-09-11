// ***************** Creating Tables ****************************
function createTestMaze(table) 
{
//	createMaze1(table);
	
	var mazeLevel = new MazeLevels();
	mazeLevel.setLevel(1);
	
	createMazeUsingLevel(mazeLevel, table);
}

function createMazeUsingLevel(mazeLevel, table)
{
	var canvas = new SokobanCanvas(mazeLevel.mazeDimension, table);
	canvas.drawDefinedMaze(mazeLevel.pusherPosition, mazeLevel.brickArray,
						   mazeLevel.destinationArray, mazeLevel.immovableArray);
}

/*
	E - empty_space
	D - destination
	B - brick
	I - immovable
	P - pusher
	
*/

// TODO move it to a separate file.
function MazeLevels() 
{
	this.mazeDimension = null;
	this.pusherPosition = null;
	this.emptySpaceArray = null;
	this.destinationArray = null;
	this.immovableArray = null;
	this.brickArray = null;

	/*
	-------- Maze1 ---------
	EDED
	EBEB
	EPIE
	EEEE
	*/
	var level1 = [
	              ['E','D','D','E'],
	              ['E','B','B','I'],
	              ['E','P','I','E'],
	              ['E','E','E','E']
	              ];
	
	// TODO get different levels based on the var 'level'.
	this.getLevelStructure = function(levelNo)
	{
		return level1;
	};
}

// TODO create raw mazelevel having just dimension and structure.

// TODO remove hardcoded dimension
MazeLevels.prototype.setLevel = function(levelNo)
{
	// initialize arrays and dimension
	this.mazeDimension = new MazeDimension(4, 4);
	this.emptySpaceArray = new Array();
	this.destinationArray = new Array();
	this.immovableArray = new Array();
	this.brickArray = new Array();
	
	var mazeLevel = this.getLevelStructure(levelNo);
	
	for (var i = 0; i < 4; i++) 
	{
		for (var j = 0; j < 4; j++) 
		{
			var type = mazeLevel[i][j];
			var position = new Position(j,3-i);
			
			if (type == 'E')
			{
				this.emptySpaceArray.push(position);
			} 
			else if (type == 'B')
			{
				this.brickArray.push(position);
			}
			else if (type == 'D')
			{
				this.destinationArray.push(position);
			}
			else if (type == 'I')
			{
				this.immovableArray.push(position);
			} 
			else if (type == 'P')
			{
				this.pusherPosition = position;
			}
				
			
		}
	}
};



