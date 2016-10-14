var cellSize = 20;

// Size of map
var xTerrainSize = 100;
var yTerrainSize = 100;

// Player position on map
var playerX = 10;
var playerY = 10;

var enemyX = 48;
var enemyY = 70;

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
var colorPlayer = 'lime';
var colorEnemy = 'red';

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

function terrainToGraph(t) {
	var g = []
	for (var i=0; i<terrain.length; i++) {
		var row = [];
		for (var j=0; j<terrain[0].length; j++) {
			if (terrain[i][j] == colorTree) {
				row.push(0);
			} else {
				row.push(1);
			}
		}
		g.push(row);
	}
	return new Graph(g);
}

var terrain = generateTerrain();

function redraw() {
	for (var i=0; i<xCameraSize; i++) {
		for (var j=0; j<yCameraSize; j++) {

			var terrainX = i + playerX + xCameraOffset;
			var terrainY = j + playerY + yCameraOffset;

			if (terrainX == playerX && terrainY == playerY) {
				ctx.fillStyle = colorPlayer;

			} else if (terrainX == enemyX && terrainY == enemyY) {
				ctx.fillStyle = colorEnemy;

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
	// Where are we trying to go?

	var targetX = playerX;
	var targetY = playerY;

	if (e.keyCode == 39) {
		targetX += 1;
	} else if (e.keyCode == 37) {
		targetX -= 1;
	} else if (e.keyCode == 40) {
		targetY += 1;
	} else if (e.keyCode == 38) {
		targetY -= 1;
	}

	// Can we even go here?
	if (targetX >= 0 && targetX < xTerrainSize &&
		targetY >= 0 && targetY < yTerrainSize &&
		terrain[targetX][targetY] != colorTree) {

		// Yes we can!
		playerX = targetX;
		playerY = targetY;

		// Move the enemy
		var g = terrainToGraph(terrain);
		var start = g.grid[enemyX][enemyY];
		var end = g.grid[playerX][playerY];
		var path = astar.search(g, start, end);
		var enemyTarget = path[0];

		enemyX = enemyTarget.x;
		enemyY = enemyTarget.y;

		redraw();
	}
};

redraw();
