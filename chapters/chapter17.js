//Shapes
let cx = document.querySelector('canvas').getContext('2d');

//1. A trapezoid (a rectangle that is wider on one side)
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

//2. A red diamond (a rectangle rotated 45 degrees or ¼π radians)
const diamond = (context, centerX, centerY, side) => {
  context.save();
  context.translate(centerX, centerY);
  context.rotate(0.25 * Math.PI);
  context.translate(-centerX, -centerY);
  context.fillStyle = 'red';
  context.fillRect(centerX - side / 2, centerY - side / 2, side, side);
  context.restore();
};

diamond(cx, 200, 150, 50);
trapezoid(cx, 200, 150, 30, 70, 60);

//3. A zigzagging line
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
cx.fillStyle = 'lightblue';
cx.fillRect(300, 60, 50, 100);
zigzag(cx, 300, 60, 50, 100, 9);

//4. A spiral made up of 100 straight line segments
//Got some help from Stack overflow...
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
spiral(cx, 450, 100, 0.9);

//5. A yellow star
const star = (context, centerX, centerY, size, beams) => {
  const angle = (Math.PI * 2) / beams;
  context.beginPath();
  context.moveTo(centerX + size, centerY);
  for (i = 0; i <= beams; i++) {
    x = centerX + size * Math.cos(angle * i);
    y = centerY + size * Math.sin(angle * i);
    context.quadraticCurveTo(centerX, centerY, x, y);
  }
  context.strokeStyle = '#F8981D';
  context.stroke();
  context.fillStyle = '#F8981D';
  context.fill();
};

star(cx, 600, 300, 100, 8);

//The pie chart
const results = [
  { name: 'Satisfied', count: 100, color: 'lightblue' },
  { name: 'Neutral', count: 53, color: 'lightgreen' },
  { name: 'Unsatisfied', count: 510, color: 'pink' },
  { name: 'No comment', count: 75, color: 'silver' },
];
let total = results.reduce((sum, { count }) => sum + count, 0);
let currentAngle = -0.5 * Math.PI;
let centerX = 300,
  centerY = 400;
let radius = 100;

for (let result of results) {
  let sliceAngle = (result.count / total) * 2 * Math.PI;
  let textPosition = currentAngle + sliceAngle / 2;
  let offsetX = 0;
  let offsetY = 0;
  console.log(textPosition);
  
  cx.beginPath();
  cx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);

  cx.lineTo(centerX, centerY);
  cx.fillStyle = result.color;
  cx.fill();
  cx.font = '14px Georgia';
  cx.fillStyle = 'black';
  textPosition > Math.PI / 2
    ? (offsetX = -90)
    : (offsetX = 20);
  textPosition > 4 || textPosition < -1
    ? (offsetY = -20)
    : offsetY;
  textPosition > 1 && textPosition < 2 ? offsetY = 20 : offsetY;
  cx.fillText(
    result.name,
    centerX + offsetX + radius * Math.cos(textPosition),
    centerY + offsetY + radius * Math.sin(textPosition)
  );
  currentAngle += sliceAngle;
}
