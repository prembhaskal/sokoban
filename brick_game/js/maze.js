// object to define the maze dimensions.
function MazeDimension (width, height) {
	this.width = width;
	this.height = height;
}

function RawMaze (mazeDimension, mazeStatics, mazeMovables)
{
	this.mazeDimension = mazeDimension;
	this.mazeStatics = mazeStatics;
	this.mazeMovables = mazeMovables;
}

function Maze (mazeDimension, cellArray, pusher, brickArray)
{
	this.mazeDimension = mazeDimension;
	this.cellArray = cellArray;
	this.pusher = pusher;
	this.brickArray = brickArray;
}


function MazeCreator() {
	// parses a raw maze, creates and returns a maze corresponding to the maze.
	this.createMaze = function(rawMaze) {
		var mazeDimension = rawMaze.mazeDimension;
		var mazeStatics = rawMaze.mazeStatics;
		var mazeMovables = rawMaze.mazeMovables;
		
		// create the cellArray representing the maze
		var cellArray = new Array(mazeDimension.height);
		for (var i = 0; i < cellArray.length; i++) {
			cellArray[i] = new Array(mazeDimension.width);
		}
		

		// get the static objects
		for (var i = 0; i < mazeDimension.height; i++) {
			for (var j = 0; j < mazeDimension.width; j++) {
				var type = mazeStatics[i][j];
				var position = new Position(j, mazeDimension.height-1-i);
				
				if (type == 'E') {
					cellArray[i][j] = new EmptySpace (position, getCellId(position));
				}
				else if (type == 'D') {
					cellArray[i][j] = new Destination (position, getCellId(position));
				}
				else if (type == 'I') {
					cellArray[i][j] = new Stone (position, getCellId(position));
				}
				
			}
		}
		
		// get the movable objects.
		var pusher = null;
		var brickArray = new Array();
		
		for ( var i = 0; i < mazeDimension.height; i++) {
			for ( var j = 0; j < mazeDimension.width; j++) {
				var type = mazeMovables[i][j];
				var position = new Position(j, mazeDimension.height-1-i);
				
				if (type == 'B') {
					brickArray.push(new Brick(position, getCellId(position),mazeDimension));
				}
				else if (type == 'P') {
					pusher = new Pusher(position, getCellId(position),mazeDimension);
				}
			}
		}
		
		var maze = new Maze (mazeDimension, cellArray, pusher, brickArray);
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
			I - immovable
						
			B - brick
			P - pusher
			X - no movable object
			
			-------- Maze1 ---------
			EDDE
			EEEI
			EEIE
			EEEE
			
			XXXX
			XBBX
			XPXX
			XXXX
		*/
		var dimension1 = new MazeDimension(4, 4);
		var level1Static = [
				              ['E','D','D','E'],
				              ['E','E','E','I'],
				              ['E','E','I','E'],
				              ['E','E','E','E']
				            ];
		
		var level1Movable = [
		                      ['X','X','X','X'],
				              ['X','B','B','X'],
				              ['X','P','X','X'],
				              ['X','X','X','X']
				            ];
		
		var rawMaze1 = new RawMaze(dimension1, level1Static, level1Movable);
		rawMazes.push(rawMaze1);
		
		/*
			-------- Maze2 ---------
			Note that at the start of game, the pusher will be on a destination in this example.
			
			EEDD
			EEEE
			EIIE
			
			XXPX
			XBBX
			XXXX
		*/
		var dimension2 = new MazeDimension(4, 3);
		var level2Static = [
				              ['E','E','D','D'],
				              ['E','E','E','E'],
				              ['E','E','E','E']
			              ];
		
		var level2Movable= [
				              ['X','B','P','X'],
				              ['X','X','B','X'],
				              ['X','X','X','X']
			              ];
		
		var rawMaze2 = new RawMaze(dimension2, level2Static, level2Movable);
		rawMazes.push(rawMaze2);
	};
	
	// levelNo is 1 based, hence -1
	this.getRawMaze = function(levelNo) {
		return rawMazes[levelNo-1];
	};
}
