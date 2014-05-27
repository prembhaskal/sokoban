// object to define the maze dimensions.
function MazeDimension(width, height) {
    this.width = width;
    this.height = height;
}

function RawMaze(mazeDimension, mazeStatics, mazeMovables) {
    this.mazeDimension = mazeDimension;
    this.mazeStatics = mazeStatics;
    this.mazeMovables = mazeMovables;
}

function Maze(mazeDimension, cellArray, pusher, brickArray) {
    this.mazeDimension = mazeDimension;
    this.cellArray = cellArray;
    this.pusher = pusher;
    this.brickArray = brickArray;
}


function MazeCreator() {
    // parses a raw maze, creates and returns a maze corresponding to the maze.
    this.createMaze = function (rawMaze) {
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
                var position = new Position(j, mazeDimension.height - 1 - i);

                if (type == 'E') {
                    cellArray[i][j] = new EmptySpace(position, getCellId(position));
                }
                else if (type == 'D') {
                    cellArray[i][j] = new Destination(position, getCellId(position));
                }
                else if (type == 'I') {
                    cellArray[i][j] = new Stone(position, getCellId(position));
                }
                else if (type == 'G') {
                    cellArray[i][j] = new Greenery(position, getCellId(position));
                }

            }
        }

        // get the movable objects.
        var pusher = null;
        var brickArray = new Array();

        for (var i = 0; i < mazeDimension.height; i++) {
            for (var j = 0; j < mazeDimension.width; j++) {
                var type = mazeMovables[i][j];
                var position = new Position(j, mazeDimension.height - 1 - i);

                if (type == 'B') {
                    brickArray.push(new Brick(position, getCellId(position), mazeDimension));
                }
                else if (type == 'P') {
                    pusher = new Pusher(position, getCellId(position), mazeDimension);
                }
            }
        }

        var maze = new Maze(mazeDimension, cellArray, pusher, brickArray);
        return maze;
    };

    function getCellId(position) {
        return 'col_' + position.x_pos + '_' + position.y_pos;
    }
}

/*
 Object containing all the levels of the maze.
 Basic terminologies
 E - empty_space
 D - destination
 I - immovable
 G - Greenery

 B - brick
 P - pusher
 X - no movable object
 */

function AllMazeLevels() {
    var rawMazes = new Array();
    var UNIVERSAL_HEIGHT = 15;
    var UNIVERSAL_WIDTH = 15;

    addAllMazes();

    function addAllMazes() {

        var universalDimension = new MazeDimension(UNIVERSAL_WIDTH, UNIVERSAL_HEIGHT);

        for (var level = 1; level <= allLevels.len; level++) {
            var levelStatic = allLevels[level].base;
            var levelMovable = allLevels[level].top;
            var dimension = new MazeDimension(levelStatic[0].length, levelStatic.length);

            levelStatic = convertToUniversal(dimension, levelStatic);
            levelMovable = convertToUniversal(dimension, levelMovable);

            var rawMaze = new RawMaze(universalDimension, levelStatic, levelMovable);
            rawMazes.push(rawMaze);
        }


    };

    // levelNo is 1 based, hence -1
    this.getRawMaze = function (levelNo) {
        return rawMazes[levelNo - 1];
    };


    // convert the maze to a universal maze
    function convertToUniversal(dimension, normalArray) {
        var greenery = 'G';// represents the greenery surrounding the actual maze.

        // create the array
        var universalArray = new Array(UNIVERSAL_HEIGHT);
        for (var i = 0; i < UNIVERSAL_HEIGHT; i++) {
            universalArray[i] = new Array(UNIVERSAL_WIDTH);
        }

        // fill the area with greenery intially.
        for (var i = 0; i < UNIVERSAL_HEIGHT; i++) {
            for (var j = 0; j < UNIVERSAL_WIDTH; j++) {
                universalArray[i][j] = greenery;
            }
        }

        // merge the normal array on the universal array.
        var startHeight = parseInt((UNIVERSAL_HEIGHT - dimension.height) / 2);
        var startWidth = parseInt((UNIVERSAL_WIDTH - dimension.width) / 2);

        for (var i = 0; i < dimension.height; i++) {
            for (var j = 0; j < dimension.width; j++) {
                universalArray[i + startHeight][j + startWidth] = normalArray[i][j];
            }
        }

        coverWithBoundary(universalArray);

        return universalArray;
    }

    // cover with boundary
    function coverWithBoundary(mazeArray) {

        // cover the maze with immovable on the inner boundary.
        for (var i = 1; i < UNIVERSAL_HEIGHT - 1; i++) {
            for (var j = 1; j < UNIVERSAL_WIDTH - 1; j++) {
                var cell = mazeArray[i][j];
                if (doesCellBelongToMaze(cell)) {
                    replaceNeighboursAtBoundary(i, j, mazeArray);
                }
            }
        }


        // cover the maze with immovable on the outer boundary.
        for (var i = 0; i < UNIVERSAL_HEIGHT; i++) {
            for (var j = 0; j < UNIVERSAL_WIDTH; j++) {
                var cell = mazeArray[i][j];
                if (!doesCellBelongToMaze(cell) && isCellOnBoundary(i, j))
                    mazeArray[i][j] = 'I';

            }
        }
    }

    function replaceNeighboursAtBoundary(i, j, mazeArray) {
        // check all the 8 neighbours of a cell.
        for (var x = -1; x < 2; x++) {
            for (var y = -1; y < 2; y++) {
                if (x == 0 && y == 0)
                    continue;

                if (!doesCellBelongToMaze(mazeArray[i + x][j + y]))
                    mazeArray[i + x][j + y] = 'I';
            }
        }
    }

    function isCellOnBoundary(i, j) {
        if (i == 0 || j == 0 || i == UNIVERSAL_HEIGHT - 1 || j == UNIVERSAL_WIDTH - 1)
            return true;
        return false;
    }


    function doesCellBelongToMaze(cell) {
        if (cell === 'E' || cell === 'D' || cell === 'B' || cell === 'P')
            return true;

        return false;
    }
}
