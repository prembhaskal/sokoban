//Independent Util functions 
function changeClassOfElement(elementId, className) {
	elementId = '#'+elementId;
	$(elementId).removeClass();
	$(elementId).addClass(className);
}

function getArrowKeyPressed(keyCode) {
	if(keyCode == '37') {
		return globalObjectMap.LEFT_ARROW;
	}
	else if (keyCode == '38') {
		return globalObjectMap.UP_ARROW;
	}
	else if (keyCode == '39') {
		return globalObjectMap.RIGHT_ARROW;
	} 
	else if (keyCode == '40') {
		return globalObjectMap.DOWN_ARROW;
	} 
	else {
		return null;
	}
}

