
// defines how a ball looks:
const Ball = function(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
	this.direction = Math.random() * Math.PI * 2;
	this.speed = Math.random() * 3 + 1;

};

// this defines how a ball behaves (how it moves)
Ball.prototype = {
	updatePosition:function(width, height) {
		this.x += Math.cos(this.direction) * this.speed;
		this.y += Math.sin(this.direction) * this.speed;

		if(this.x - this.radius < 0) {
			this.x = 0 + this.radius;

			this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
		} else if (this.x + this.radius > width) {
			this.x = width - this.radius;
			this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1);
		}

		if(this.y - this.radius < 0) {
			this.y = 0 + this.radius;

			this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
		} else if (this.y + this.radius > height) {
			this.y = height - this.radius;
			this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction));
		}


	}
}

// this gets our canvas element (found in the html)
var context = document.querySelector("canvas").getContext("2d");

// an empty array of balls
var balls = new Array();

// getting the initial position for every ball
let x = document.documentElement.clientWidth * 0.5;
let y = document.documentElement.clientHeight * 0.5;

// appending balls to the canvas without any action
for(let index = 0; index < 10; index ++) {

	balls.push(new Ball(x, y, Math.floor(Math.random() *  + +1)));

}

// appending balls to the canvs on click
document.querySelector("#sounds").onclick = function(){
	balls.push(new Ball(x, y, Math.floor(Math.random() * 10 + 20)));
};
document.querySelector("#stopButton").onclick = function(){
	balls = [];
};


// javascript's way of running a constant animation
function loop(){
	window.requestAnimationFrame(loop);

	
	let width = document.documentElement.clientWidth;
	let height = document.documentElement.clientHeight;

	context.canvas.width = width;
	context.canvas.height = height;

	// animate each ball from the ball array:
	for(let index = 0; index < balls.length -1; index ++) {

	let ball = balls[index];

	context.fillStyle = ball.color;
	context.beginPath();
	context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	context.fill();


	ball.updatePosition(width, height);


};

}


	


loop();