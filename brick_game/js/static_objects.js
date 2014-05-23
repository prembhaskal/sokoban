// TODO create a Interface/Abstract object, cell and all other objects inherit from it.


//STONE Object
function Stone(position, cellId) {
    var cellType = SokobanUtil.CellType.StoneType;

    this.getCellType = function () {
        return cellType;
    };

    this.getPosition = function () {
        return position;
    };

    this.cellId = function () {
        return cellId;
    };
}

//DESTINATION Object
function Destination(position, cellId) {
    var cellType = SokobanUtil.CellType.DestinationType;

    this.getCellType = function () {
        return cellType;
    };

    this.getPosition = function () {
        return position;
    };

    this.cellId = function () {
        return cellId;
    };
}

//EMPTYSPACE Object
function EmptySpace(position, cellId) {
    var cellType = SokobanUtil.CellType.EmptySpaceType;

    this.getCellType = function () {
        return cellType;
    };

    this.getPosition = function () {
        return position;
    };

    this.cellId = function () {
        return cellId;
    };
}

// GREENERY Object
function Greenery(position, cellId) {
    var cellType = SokobanUtil.CellType.Greenery;

    this.getCellType = function () {
        return cellType;
    };

    this.getPosition = function () {
        return position;
    };

    this.cellId = function () {
        return cellId;
    };

}


// Moves object. this object represents one move of a pusher/brick.
function GameMove(cell, xinc, yinc) {
    this.cell = cell;
    this.xinc = xinc;
    this.yinc = yinc;
}