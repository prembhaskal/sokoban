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
		var dimension1 = new MazeDimension(4, 6);
		var level1Static = [
								['E','E','E','I'],
								['E','D','E','I'],
								['E','D','E','I'],
								['E','D','E','I'],
								['E','E','E','E'],
								['E','E','E','E']
							];
		
		var level1Movable = [
								['X','X','X','X'],
								['X','X','X','X'],
								['X','B','X','X'],
								['X','B','X','X'],
								['X','B','X','X'],
								['X','P','X','X']
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

		//	--------------- Maze 3 --------------------
		var dimension3 = new MazeDimension(4,5);
		var level3Static = [
								['E','D','I','I'],
								['E','E','I','I'],
								['D','E','E','E'],
								['E','E','E','E'],
								['E','E','I','I']
							];
		var level3Movable = [
								['X','X','X','X'],
								['X','X','X','X'],
								['B','X','X','X'],
								['X','P','B','X'],
								['X','X','X','X']
							];
		var rawMaze3 = new RawMaze(dimension3, level3Static, level3Movable);
		rawMazes.push(rawMaze3);

		// --------------- Maze 4 ----------------------
		var dimension4 = new MazeDimension(4, 5);
		var level4Static = [
								['E','E','E','E'],
								['E','I','E','E'],
								['E','E','D','E'],
								['E','D','D','E'],
								['E','E','E','E']
							];
		var level4Movable = [
								['X','X','X','X'],
								['X','X','P','X'],
								['X','B','B','X'],
								['X','X','B','X'],
								['X','X','X','X']
							];
		var rawMaze4 = new RawMaze(dimension4, level4Static, level4Movable);
		rawMazes.push(rawMaze4);

		// ----------------- Maze 5 ----------------------
		var dimension5 = new MazeDimension(4, 7);
		var level5Static = [
								['I','E','E','E'],
								['I','E','I','D'],
								['E','E','E','E'],
								['E','E','E','D'],
								['I','E','I','I'],
								['I','E','E','E'],
								['I','E','E','E']
							];
		var level5Movable = [
								['X','X','X','X'],
								['X','X','X','X'],
								['X','X','X','X'],
								['X','X','X','X'],
								['X','X','X','X'],
								['X','B','B','P'],
								['X','X','X','X']
							];
		var rawMaze5 = new RawMaze(dimension5, level5Static, level5Movable);
		rawMazes.push(rawMaze5);

		// -------------------- Maze 6 ------------------------
		var dimension6 = new MazeDimension(5, 6);
		var level6Static = [
			['I','I','I','E','E'],
			['E','E','E','E','E'],
			['E','D','E','D','E'],
			['E','E','E','E','E'],
			['E','D','E','D','E'],
			['E','E','E','E','E']
		];
		var level6Movable = [
			['X','X','X','X','X'],
			['X','X','X','X','X'],
			['X','X','B','X','X'],
			['X','B','P','B','X'],
			['X','X','B','X','X'],
			['X','X','X','X','X']
		];
		var rawMaze6 = new RawMaze(dimension6, level6Static, level6Movable);
		rawMazes.push(rawMaze6);

		// -------------------- Maze 7 ------------------------
		var dimension7 = new MazeDimension(5, 6);
		var level7Static = [
			['E','E','E','E','E'],
			['E','D','E','D','E'],
			['E','E','D','E','E'],
			['E','D','E','D','E'],
			['E','E','D','E','E'],
			['E','E','E','E','E']
		];
		var level7Movable = [
			['X','X','X','X','X'],
			['X','X','B','X','X'],
			['X','B','X','B','X'],
			['X','X','B','X','X'],
			['X','B','X','B','X'],
			['X','X','P','X','X']
		];
		var rawMaze7 = new RawMaze(dimension7, level7Static, level7Movable);
		rawMazes.push(rawMaze7);

		// -------- Maze 8 ---------------------
		var dimension8 = new MazeDimension(4, 5);
		var level8Static = [
			['D','E','E','I'],
			['E','E','E','E'],
			['I','E','E','E'],
			['I','I','E','E'],
			['I','I','I','D']
		];

		var level8Movable = [
			['X','X','X','X'],
			['P','B','B','X'],
			['X','X','X','X'],
			['X','X','X','X'],
			['X','X','X','X']
		];
		var rawMaze8 = new RawMaze(dimension8, level8Static, level8Movable);
		rawMazes.push(rawMaze8);

	};
	
	// levelNo is 1 based, hence -1
	this.getRawMaze = function(levelNo) {
		return rawMazes[levelNo-1];
	};
}
