//Balloon

//My solution
const balloon = document.getElementById('balloon');
let size = 50;
balloon.style.fontSize = `${size}px`;

const balloonHandler = (event) => {
  event.preventDefault();
  if (event.key === 'ArrowUp') {
    size *= 1.1;
  }
  if (event.key === 'ArrowDown') {
    size *= 0.9;
  }
  balloon.style.fontSize = `${size}px`;
  if (size > 200) {
    balloon.innerHTML = '💥';
    window.removeEventListener('keydown', balloonHandler);
  }
};

window.addEventListener('keydown', balloonHandler);

//Solution in book
/*   let p = document.querySelector('p');
  let size;
  function setSize(newSize) {
    size = newSize;
    p.style.fontSize = size + 'px';
  }
  setSize(20);

  function handleArrow(event) {
    if (event.key == 'ArrowUp') {
      if (size > 70) {
        p.textContent = '💥';
        document.body.removeEventListener('keydown', handleArrow);
      } else {
        setSize(size * 1.1);
        event.preventDefault();
      }
    } else if (event.key == 'ArrowDown') {
      setSize(size * 0.9);
      event.preventDefault();
    }
  }
  document.body.addEventListener('keydown', handleArrow); */

//Mouse trail

const boxFactory = () => {
  let box = document.createElement('div');
  box.className = 'trail';
  return box;
};

//My solution
const trailHandler = (event) => {
  let box = boxFactory();
  box.style.left = event.pageX - 3 + 'px';
  box.style.top = event.pageY - 3 + 'px';
  document.body.appendChild(box);
  setTimeout(() => {
    box.remove();
  }, 100);
};

  let dots = [];
  for (let i = 0; i < 12; i++) {
    let node = document.createElement('div');
    node.className = 'trail';
    document.body.appendChild(node);
    dots.push(node);
  }
  let currentDot = 0;

  window.addEventListener('mousemove', (event) => {
    let dot = dots[currentDot];
    dot.style.left = event.pageX - 3 + 'px';
    dot.style.top = event.pageY - 3 + 'px';
    currentDot = (currentDot + 1) % dots.length;
  });

/* window.addEventListener('mousemove', trailHandler);
 */