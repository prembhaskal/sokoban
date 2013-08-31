// *********************** Object Position ***************************
// object function to store co-ordinates
// 0 based position
function Position(x_pos, y_pos) {
	this.x_pos = x_pos;
	this.y_pos = y_pos;
}

Position.prototype.equals = function(otherPosition) {
	if(! (otherPosition instanceof Position))
		return false;
	if (otherPosition.x_pos != this.x_pos)
		return false;
	if (otherPosition.y_pos != this.y_pos)
		return false;
	return true;
};