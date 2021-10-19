//Shapes
let cx = document.querySelector('canvas').getContext('2d');

//1. A trapezoid (a rectangle that is wider on one side)
const trapezoid = (context, startX, startY, upperSide, bottomSide, height) => {
  const difference =
    upperSide > bottomSide
      ? (upperSide - bottomSide) * Math.sign(-1)
      : bottomSide - upperSide;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(startX + upperSide, startY);
  context.lineTo(startX + upperSide + difference / 2, startY + height);
  context.lineTo(startX - difference / 2, startY + height);
  context.lineTo(startX, startY);
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

diamond(cx, 50, 50, 50);
trapezoid(cx, 50, 50, 30, 70, 60);

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

//5. A yellow star
