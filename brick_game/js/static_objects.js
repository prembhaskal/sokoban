

// TODO create a Interface/Abstract object, cell and all other objects inherit from it.



//STONE Object
function Stone (position, cellId) {
	var cellType = SokobanUtil.CellType.StoneType;
	
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
	var cellType = SokobanUtil.CellType.DestinationType;
	
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
	var cellType = SokobanUtil.CellType.EmptySpaceType;
	
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
