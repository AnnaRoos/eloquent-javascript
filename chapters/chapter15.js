//Balloon

//My solution
const balloon = document.getElementById('balloon');
let size = 50;
balloon.style.fontSize = `${size}px`;

window.addEventListener('keydown', function blowUp(event) {
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
    window.removeEventListener('keydown', blowUp);
  }
});

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
