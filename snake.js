//En la primera linea definimos la posicion de la variable, en la parte alta y parte baja 
//En la segunda variable definimos el  color y pixels para que aparezca en la pantalla
var drawablewall = { color: "blue", pixels: wall };

var drawboth = function (walltoDraw, apple) {
	var drawablewall = {color: "blue", pixels: walltoDraw };
	var drawableApple = {color: "green", pixels: [apple]};
	var drawableObjects = [drawablewall, drawableApple];
	CHUNK.draw(drawableObjects);
}

var moveSegment = function (segment) {
	switch (segment.direction) {
		case "down":
		  return { top: segment.top + 1, left: segment.left };	
	    case "up": 
		  return { top: segment.top - 1, left: segment.left };
	    case "right":
		  return { top: segment.top, left: segment.left + 1 };
	    case "left":
		  return { top: segment.top, left: segment.left - 1};
		default:
		  return segment;
	}
}

var segmentFurtherForwardThan = function(index, wall) {
    return wall[index - 1] || wall[index];
}

var movewall = function(wall) {
	return wall.map(function(oldSegment, segmentIndex) {
		var newSegment = moveSegment(oldSegment);
		newSegment.direction = segmentFurtherForwardThan(segmentIndex, wall).direction;
	return newSegment;
   });
}

//Advance Game

var advanceGame = function() {
	var newWall = movewall(wall);

	if (ate(newWall, wall)) {
		CHUNK.endGame();
        CHUNK.flashMessage("Te acabas de comer a ti mismo, GORDA!");
	}

	
	if (ate(newWall, [apple])) {
		newWall = growWall(newWall);
		apple = CHUNK.randomLocation();
	}

	if (ate(newWall, CHUNK.gameBoundaries())) {
		CHUNK.endGame();
        CHUNK.flashMessage("Eres una tontita ;)");
	}

	wall = newWall;
	drawboth(wall, apple);
}


var changeDirection = function(direction) {
  wall[0].direction = direction;
}

var growWall = function(wall) {
  var indexOfLastSegment = wall.length - 1;
  var lastSegment = wall[indexOfLastSegment];
  wall.push({ top: lastSegment.top, left: lastSegment.left });
  return wall;
}

var ate = function(wall, otherThing) {
  var head = wall[0];
  return CHUNK.detectCollisionBetween([head], otherThing);
}

var apple = CHUNK.randomLocation();
var wall = [{ top:12, left: 0, direction: "down" }, { top:11, left: 0, direction: "down" }, { top:10, left: 0, direction: "down" }, { top:9, left: 0, direction: "down" }, { top:8, left: 0, direction: "down" }, { top:7, left: 0, direction: "down" }, { top:6, left: 0, direction: "down" }, { top:5, left: 0, direction: "down" }, { top:4, left: 0, direction: "down" }, { top:3, left: 0, direction: "down" }, { top:2, left: 0, direction: "down" }, { top:1, left:0, direction: "down"}, { top:0, left:0, direction: "down"} ];

CHUNK.executeNTimesPerSecond(advanceGame, 6);
CHUNK.onArrowKey(changeDirection);







