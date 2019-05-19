//Gotta set up them variables
/*	var context;
	var contexto;
	var pause = false;
	var w = false;
	var s = false;
	var up = false;
	var down = false;

	var blockx;
	var blocky;
	var block2x;
	var block2y;
	var blockh = 160;
	var blockw = 30;
	
	var ballx;
	var bally;
	var ballh = 25;
	var ballw = 25;

	var numx;
	var numy;
	var numh = 100;
	var numw = 20;


	//functions ftw
	function init() {
		context = $("#canvas")[0].getContext("2d");
		height = $("#canvas").height();
		width = $("#canvas").width();
		
		contexto = $("#score")[0].getContext("2d");
		height2 = $("#score").height();
		width2 = $("#score").width();
		
		blockx = width / 100 * 8;
		blocky = height / 2 - 80;
		block2x = width / 100 * 88;
		block2y = height / 2 - 80;
		ballx = width / 2 - 12.5;
		bally = height / 2 - 12.5;
		
		numx= width2 / 100 * 25;
		numy = height2/50 - 50;
		setInterval("draw()", 25);
	}
	
	function clearCan() {
		context.clearRect(0, 0, width, height);
	}
	
	function rect(x, y, w, h) {
		context.beginPath();
		context.rect(x, y, w, h);
		context.endPath();
	}
	
	function rect(x, y, w, h) {
		contexto.beginPath();
		contexto.rect(x, y, w, h);
		contexto.endPath();
	}

	function draw() {
		clearCan();
		if (w) blocky -= 6;
		else if (s) blocky += 6;
		if (up) block2y -= 6;
		else if (down) block2y += 6;
		
		if (blocky <= 0) blocky = 0;
		if ((blocky + blockh) >= height) blocky = height - blockh;
		if (block2y <= 0) block2y = 0;
		if ((block2y + blockh) >= height) block2y = height - blockh;
		
		context.fillStyle="#000000";
		context.fillRect(0, 0, width, height);
		context.fillStyle="#FFFFFF";
		context.fillRect(blockx, blocky, blockw, blockh);
		context.fillRect(block2x, block2y, blockw, blockh);
		context.fillRect(ballx, bally, ballw, ballh);
		
		contexto.fillRect(numx, numy, numw, numh);
		ballx = ballx / .99;
	}
	
	function pausey(evnt) {
		if (evnt.keyCode == 32 && pause == false) pause = true;
		else if (evnt.keyCode == 32 && pause == true) pause = false;
	}

	function onKeyDown(evnt) {
		if (evnt.keyCode == 87 && pause == false) w = true;
		else if (evnt.keyCode == 83 && pause == false) s = true;
		if (evnt.keyCode == 38 && pause == false) up = true;
		else if (evnt.keyCode == 40 && pause == false) down = true;
	}
	
	function onKeyUp(evnt) {
		if (evnt.keyCode == 87) w = false;
		else if (evnt.keyCode == 83) s = false;
		if (evnt.keyCode == 38) up = false;
		else if (evnt.keyCode == 40) down = false;
	}
	
	$(document).keydown(pausey);
	$(document).keydown(onKeyDown);
	$(document).keyup(onKeyUp);
	window.onload = init;
*/

var context;
var w = false;
var s = false;
var up = false;
var down = false;

var p1x;
var p1y;
var p2x;
var p2y;
var ph = 180;
var pw = 40;


function init() {
	context = $("#canvas")[0].getContext("2d");
	height = $("#canvas").height();
	width = $("#canvas").width();
	p1x = width / 100 * 8;
	p1y = height / 2 - 90;
	p2x = width / 100 * 92 - 40;
	p2y = height / 2 - 90;
	setInterval("draw()", 25);
}

function clearCanvas() {
	context.clearRect(0, 0, width, height);
}

function rect(x, y, w, h) {
	context.beginPath();
	context.rect(x, y, w, h);
	context.endPath();
}

function draw() {
	if (w) p1y -= 6;
	else if (s) p1y += 6;
	if (up) p2y -= 6;
	else if (down) p2y += 6;
	
	if (p1y <= 0) p1y = 0
	if ((p1y + ph) >= height) p1y = height - ph;
	if (p2y <= 0) p2y = 0
	if ((p2y + ph) >= height) p2y = height - ph;
	
	clearCanvas();
	context.fillStyle = "#000000";
	context.fillRect(0, 0, width, height);
	context.fillStyle = "#FFFFFF";
	context.fillRect(p1x, p1y, pw, ph);
	context.fillRect(p2x, p2y, pw, ph);
}

function keyDown() {
	asdf
}

$
window.onload = init;
