//Shapes
let cx = document.querySelector('canvas').getContext('2d');

//1. A trapezoid (a rectangle that is wider on one side)
//My solution, decided to let user choose size and length of sides
const trapezoid = (
  context,
  centerX,
  centerY,
  upperSide,
  bottomSide,
  height
) => {
  context.beginPath();
  context.moveTo(centerX - upperSide / 2, centerY - height / 2);
  context.lineTo(centerX + upperSide / 2, centerY - height / 2);
  context.lineTo(centerX + bottomSide / 2, centerY + height / 2);
  context.lineTo(centerX - bottomSide / 2, centerY + height / 2);
  context.closePath();
  context.stroke();
};

trapezoid(cx, 140, 80, 70, 30, 60);
trapezoid(cx, 200, 150, 30, 70, 60);

//Solution in book
/* function trapezoid(x, y) {
  cx.beginPath();
  cx.moveTo(x, y);
  cx.lineTo(x + 50, y);
  cx.lineTo(x + 70, y + 50);
  cx.lineTo(x - 20, y + 50);
  cx.closePath();
  cx.stroke();
}
trapezoid(30, 30); */

//2. A red diamond (a rectangle rotated 45 degrees or ¼π radians)
//My solution
//Also here giving option to decide size
const diamond = (context, centerX, centerY, side) => {
  context.translate(centerX, centerY);
  context.rotate(0.25 * Math.PI);
  context.translate(-centerX, -centerY);
  context.fillStyle = 'red';
  context.fillRect(centerX - side / 2, centerY - side / 2, side, side);
  context.resetTransform();
};

diamond(cx, 600, 150, 50);

//Solution in book
/* function diamond(x, y) {
  cx.translate(x + 30, y + 30);
  cx.rotate(Math.PI / 4);
  cx.fillStyle = 'red';
  cx.fillRect(-30, -30, 60, 60);
  cx.resetTransform();
}
diamond(140, 30); */

//3. A zigzagging line
//My solution
//Giving option to both decide size and number of zigzag lines

const zigzag = (context, startX, startY, width, height, lines) => {
  const spaceBetween = height / lines;
  context.beginPath();
  context.moveTo(startX, startY);
  let y = startY;
  while (y < startY + height) {
    y += spaceBetween;
    context.lineTo(startX + width, y);
    if (y >= startY + height) break;
    y += spaceBetween;
    context.lineTo(startX, y);
  }
  context.stroke();
};

zigzag(cx, 300, 60, 50, 100, 9);

//Solution in book
/* function zigzag(x, y) {
  cx.beginPath();
  cx.moveTo(x, y);
  for (let i = 0; i < 8; i++) {
    cx.lineTo(x + 80, y + i * 8 + 4);
    cx.lineTo(x, y + i * 8 + 8);
  }
  cx.stroke();
}
zigzag(240, 20); */

//4. A spiral made up of 100 straight line segments
//Got some help from Stack overflow...
//Decided to let user chose lineLength so that spriral could grow bigger
const spiral = (context, centerX, centerY, lineLength) => {
  context.moveTo(centerX, centerY);
  context.beginPath();
  for (i = 0; i < 100; i++) {
    let angle = lineLength * i;
    x = centerX + angle * Math.cos(angle);
    y = centerY + angle * Math.sin(angle);
    context.lineTo(x, y);
  }
  context.stroke();
};
spiral(cx, 1000, 600, 0.9);

//Solution in book
/* function spiral(x, y) {
  let radius = 50,
    xCenter = x + radius,
    yCenter = y + radius;
  cx.beginPath();
  cx.moveTo(xCenter, yCenter);
  for (let i = 0; i < 300; i++) {
    let angle = (i * Math.PI) / 30;
    let dist = (radius * i) / 300;
    cx.lineTo(
      xCenter + Math.cos(angle) * dist,
      yCenter + Math.sin(angle) * dist
    );
  }
  cx.stroke();
}
spiral(340, 20); */

//5. A yellow star
//Decided to let user choose size and number of beams
const star = (context, centerX, centerY, radius, beams) => {
  const angle = (Math.PI * 2) / beams;
  context.beginPath();
  context.moveTo(centerX + radius, centerY);
  for (i = 0; i <= beams; i++) {
    x = centerX + radius * Math.cos(angle * i);
    y = centerY + radius * Math.sin(angle * i);
    context.quadraticCurveTo(centerX, centerY, x, y);
  }
  context.strokeStyle = '#F8981D';
  context.stroke();
  context.fillStyle = '#F8981D';
  context.fill();
};

star(cx, 800, 200, 100, 8);

//Solution in book
/* function star(x, y) {
  let radius = 50,
    xCenter = x + radius,
    yCenter = y + radius;
  cx.beginPath();
  cx.moveTo(xCenter + radius, yCenter);
  for (let i = 1; i <= 8; i++) {
    let angle = (i * Math.PI) / 4;
    cx.quadraticCurveTo(
      xCenter,
      yCenter,
      xCenter + Math.cos(angle) * radius,
      yCenter + Math.sin(angle) * radius
    );
  }
  cx.fillStyle = 'gold';
  cx.fill();
}
star(440, 20); */

//The pie chart
//My solution
const results = [
  { name: 'Satisfied', count: 100, color: 'lightblue' },
  { name: 'Neutral', count: 53, color: 'lightgreen' },
  { name: 'Unsatisfied', count: 510, color: 'pink' },
  { name: 'No comment', count: 75, color: 'silver' },
];

let total = results.reduce((sum, { count }) => sum + count, 0);
let currentAngle = -0.5 * Math.PI;
let centerX = 200,
  centerY = 400;
let radius = 100;

for (let result of results) {
  let sliceAngle = (result.count / total) * 2 * Math.PI;
  let textPosition = currentAngle + sliceAngle / 2;
  let offset = 20;

  cx.beginPath();
  cx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
  cx.lineTo(centerX, centerY);
  cx.fillStyle = result.color;
  cx.fill();

  cx.font = '14px Georgia';
  cx.fillStyle = 'black';
  textPosition > Math.PI / 2
    ? (cx.textAlign = 'right')
    : (cx.textAlign = 'left');
  cx.textBaseline = 'middle';
  cx.fillText(
    result.name,
    centerX + (offset + radius) * Math.cos(textPosition),
    centerY + (offset + radius) * Math.sin(textPosition)
  );

  currentAngle += sliceAngle;
}

//Solution in book
/* results.forEach(function (result) {
  let sliceAngle = (result.count / total) * 2 * Math.PI;
  cx.beginPath();
  cx.arc(centerX, centerY, 100, currentAngle, currentAngle + sliceAngle);

  let middleAngle = currentAngle + 0.5 * sliceAngle;
  let textX = Math.cos(middleAngle) * 120 + centerX;
  let textY = Math.sin(middleAngle) * 120 + centerY;
  cx.textBaseLine = 'middle';
  if (Math.cos(middleAngle) > 0) {
    cx.textAlign = 'left';
  } else {
    cx.textAlign = 'right';
  }
  cx.font = '15px sans-serif';
  cx.fillStyle = 'black';
  cx.fillText(result.name, textX, textY);

  currentAngle += sliceAngle;
  cx.lineTo(centerX, centerY);
  cx.fillStyle = result.color;
  cx.fill();
}); */

//A bouncing ball
//My solution
let lastTime = null;
function frame(time) {
  if (lastTime != null) {
    updateAnimation(Math.min(100, time - lastTime) / 1000);
  }
  lastTime = time;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }

  minus(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y);
  }

  get length() {
    return Math.hypot(this.x, this.y);
  }
}

const boxSize = 400;
let speedX = 80;
let speedY = 100;
let ball = new Vec(600, 600);
let ballRadius = 10;

function updateAnimation(step) {
  cx.clearRect(400, 400, boxSize, boxSize);
  cx.strokeRect(400, 400, boxSize, boxSize);

  if (ball.x + ballRadius >= 798 || ball.x - ballRadius <= 401) speedX *= -1;
  if (ball.y + ballRadius >= 798 || ball.y - ballRadius <= 401) speedY *= -1;

  ball = ball.plus(new Vec(step * speedX, step * speedY));

  cx.beginPath();
  cx.arc(ball.x, ball.y, ballRadius, 0, 2 * Math.PI);
  cx.strokeStyle = 'purple';
  cx.fillStyle = 'purple';
  cx.fill();
  cx.stroke();
}

//Solution in book
/* let x = 100,
  y = 300;
let radius = 10;
let speedX = 100,
  speedY = 60;

function updateAnimation(step) {
  cx.clearRect(0, 0, 400, 400);
  cx.strokeStyle = 'blue';
  cx.lineWidth = 4;
  cx.strokeRect(25, 25, 350, 350);

  x += step * speedX;
  y += step * speedY;
  if (x < 25 + radius || x > 375 - radius) speedX = -speedX;
  if (y < 25 + radius || y > 375 - radius) speedY = -speedY;
  cx.fillStyle = 'red';
  cx.beginPath();
  cx.arc(x, y, radius, 0, 7);
  cx.fill();
} */
