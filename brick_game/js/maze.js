// object to define the maze dimensions.
function MazeDimension (width, height) {
	this.width = width;
	this.height = height;
}

var CellType =  {BrickType : "brick", 
							 StoneType : "immovable", 
							 PusherType : "brick_mover", 
							 DestinationType : "destination",
							 EmptySpaceType: "empty_space"};

// TODO create a Interface/Abstract object, cell and all other objects inherit from it.

//BRICK Object
function Brick (position, cellId) {
	
	var cellType = CellType.BrickType;
	
	this.getCellType = function() {
		return cellType;
	};
	
	this.getPosition = function() {
		return position;
	};
	
	this.cellId = function() {
		return cellId;
	};
}

//STONE Object
function Stone (position, cellId) {
	var cellType = CellType.StoneType;
	
	this.getCellType = function() {
		return cellType;
	};
	
	this.getPosition = function() {
		return position;
	};
	
	this.cellId = function() {
		return cellId;
	};
}

//PUSHER Object
function Pusher (position, cellId) {
	var cellType = CellType.PusherType;
	
	this.getCellType = function() {
		return cellType;
	};
	
	this.getPosition = function() {
		return position;
	};
	
	this.cellId = function() {
		return cellId;
	};
}

//DESTINATION Object
function Destination (position, cellId) {
	var cellType = CellType.DestinationType;
	
	this.getCellType = function() {
		return cellType;
	};
	
	this.getPosition = function() {
		return position;
	};
	
	this.cellId = function() {
		return cellId;
	};
}

//EMPTYSPACE Object
function EmptySpace (position, cellId) 
{
	var cellType = CellType.EmptySpaceType;
	
	this.getCellType = function() 
	{
		return cellType;
	};
	
	this.getPosition = function() {
		return position;
	};
	
	this.cellId = function() {
		return cellId;
	};
}

function RawMaze (mazeDimension, mazeStructure)
{
	this.mazeDimension = mazeDimension;
	this.mazeStructure = mazeStructure;
}

function Maze (mazeDimension, cellArray)
{
	this.mazeDimension = mazeDimension;
	this.cellArray = cellArray;	
}


function MazeCreator() {
	// parses a raw maze, creates and returns a maze corresponding to the maze.
	this.createMaze = function(rawMaze) {
		var mazeDimension = rawMaze.mazeDimension;
		var mazeStructure = rawMaze.mazeStructure;
		
		// create the cellArray representing the maze
		var cellArray = new Array(mazeDimension.height);
		for (var i = 0; i < cellArray.length; i++) {
			cellArray[i] = new Array(mazeDimension.width);
		}
		

		for (var i = 0; i < mazeDimension.height; i++) {
			for (var j = 0; j < mazeDimension.width; j++) {
				var type = mazeStructure[i][j];
				var position = new Position(j, mazeDimension.height-1-i);
				
				if (type == 'E') {
					cellArray[i][j] = new EmptySpace (position, getCellId(position));
				} 
				else if (type == 'B') {
					cellArray[i][j] = new Brick (position, getCellId(position));
				}
				else if (type == 'D') {
					cellArray[i][j] = new Destination (position, getCellId(position));
				}
				else if (type == 'I') {
					cellArray[i][j] = new Stone (position, getCellId(position));
				} 
				else if (type == 'P') {
					cellArray[i][j] = new Pusher (position, getCellId(position));
				}
				
			}
		}
		
		var maze = new Maze (mazeDimension, cellArray);
		return maze;
	};
	
	function getCellId(position) {
		return 'col_' + position.x_pos + '_' + position.y_pos;
	}
}




// Object containing all the levels of the maze.
function AllMazeLevels () {
	var rawMazes = new Array();
	
	addAllMazes();
	
	function addAllMazes() {
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
