var cellSize = 20;

// Size of map
var xTerrainSize = 100;
var yTerrainSize = 100;

// Player position on map
var playerX = 10;
var playerY = 10;

// Camera is centered around player
var xCameraSize = 21;
var yCameraSize = 21;
var xCameraOffset = -10;
var yCameraOffset = -10;

var canvas = document.getElementById("canvas");
canvas.height = cellSize * yCameraSize;
canvas.width = cellSize * xCameraSize;

var colorWater = 'DarkTurquoise';
var colorTree = 'brown';
var colorGrass1 = 'DarkGreen';
var colorGrass2 = 'green';
var colorSand = 'LemonChiffon';
var colorPlayer = 'red';

var ctx = canvas.getContext("2d");

function getRandomColor() {
	var rand = Math.random();

	if (rand > 0.9) {
		return colorTree;
	} else if (rand < 0.5) {
		return colorGrass1;
	} else {
		return colorGrass2;
	}
}

function generateTerrain() {
	var terrain = [];
	for (var i=0; i<xTerrainSize; i++) {
		var row = [];
		for (var j=0; j<yTerrainSize; j++) {
			if (i == 0 || j == 0 || i == (xTerrainSize - 1) || j == (yTerrainSize - 1)) {
				row.push(colorSand);
			} else {
				row.push(getRandomColor());
			}
		}
		terrain.push(row);
	}
	return terrain;
}

var terrain = generateTerrain();

function redraw() {
	for (var i=0; i<xCameraSize; i++) {
		for (var j=0; j<yCameraSize; j++) {

			var terrainX = i + playerX + xCameraOffset;
			var terrainY = j + playerY + yCameraOffset;

			if (terrainX == playerX && terrainY == playerY) {
				ctx.fillStyle = colorPlayer;
			} else if (terrainX >= 0 && terrainY >= 0 && terrainX < xTerrainSize && terrainY < yTerrainSize) {
				ctx.fillStyle = terrain[terrainX][terrainY];
			} else {
				ctx.fillStyle = colorWater;
			}

			ctx.fillRect(cellSize * i, cellSize * j, cellSize, cellSize);
		}
	}
}

document.onkeydown = function(e) {
	console.log(playerX, xTerrainSize);
	if (e.keyCode == 39 && playerX < (xTerrainSize - 1)) {
		playerX += 1;
	} else if (e.keyCode == 37 && playerX > 0) {
		playerX -= 1;
	} else if (e.keyCode == 40 && playerY < (yTerrainSize - 1)) {
		playerY += 1;
	} else if (e.keyCode == 38 && playerY > 0) {
		playerY -= 1;
	}

	redraw();
};

redraw();
