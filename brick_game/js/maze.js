// object to define the maze dimensions.
function MazeDimension(width, height) {
	this.width = width;
	this.height = height;
}

function RawMaze(mazeDimension, mazeStructure)
{
	this.mazeDimension = mazeDimension;
	this.mazeStructure = mazeStructure;
}

function Maze(mazeDimension, mazeStructure)
{
	this.mazeDimension = mazeDimension;
	this.mazeStructure = mazeStructure;
	
	this.pusherPosition = null;
	this.emptySpaceArray = null;
	this.destinationArray = null;
	this.immovableArray = null;
	this.brickArray = null;
	
	// TODO initialise the maze on during construction.
	this.init = function ()
	{
		// initialise arrays and dimension
		this.emptySpaceArray = new Array();
		this.destinationArray = new Array();
		this.immovableArray = new Array();
		this.brickArray = new Array();
		
		for (var i = 0; i < this.mazeDimension.height; i++) 
		{
			for (var j = 0; j < this.mazeDimension.width; j++) 
			{
				var type = this.mazeStructure[i][j];
				var position = new Position(j, this.mazeDimension.height-1-i);
				
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

}


// Object containing all the levels of the maze.
function AllMazeLevels() 
{
	var rawMazes = new Array();
	
	addAllMazes();
	
	function addAllMazes()
	{
		/*
		  Basic terminologies
			E - empty_space
			D - destination
			B - brick
			I - immovable
			P - pusher
			
			-------- Maze1 ---------
			EDED
			EBEB
			EPIE
			EEEE
		*/
		var dimension1 = new MazeDimension(4, 4);
		var level1 = [
		              ['E','D','D','E'],
		              ['E','B','B','I'],
		              ['E','P','I','E'],
		              ['E','E','E','E']
		              ];
		
		var rawMaze1 = new RawMaze(dimension1, level1);
		rawMazes.push(rawMaze1);
		
		/*
			-------- Maze2 ---------
			EEDD
			EBPB
			EIIE
		*/
		var dimension2 = new MazeDimension(4, 3);
		var level2 = [
		              ['E','E','D','D'],
		              ['E','B','P','B'],
		              ['E','I','I','E'],
		              ];
		
		var rawMaze2 = new RawMaze(dimension2, level2);
		rawMazes.push(rawMaze2);
	};
	
	// levelNo is 1 based, hence -1
	this.getRawMaze = function(levelNo) {
		return rawMazes[levelNo-1];
	};
}
