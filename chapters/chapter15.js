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

window.addEventListener('mousemove', trailHandler);

//Solution in book

/*   let dots = [];
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
  }); */

//Tabs

//My solution
const tabHandler = (event) => {
  document.querySelectorAll('.tab-content').forEach((el) => {
    if (event.target.innerHTML === el.getAttribute('data-tabname')) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
  document.querySelectorAll('button').forEach((button) => {
    if (button === event.target) {
      button.classList.add('clicked');
    } else {
      button.classList.remove('clicked');
    }
  });
};

const asTabs = (node) => {
  let list = document.createElement('ul');
  let count = 1;
  for (const child of node.childNodes) {
    if (child.nodeType === document.ELEMENT_NODE) {
      let button = document.createElement('button');
      button.innerHTML = child.getAttribute('data-tabname');
      button.onclick = tabHandler;
      if (count === 1) {
        child.style.display = 'block';
        button.classList.add('clicked');
      } else child.style.display = 'none';
      child.className = 'tab-content';
      count++;
      list.appendChild(button);
    }
  }
  node.insertAdjacentElement('afterbegin', list);
};

asTabs(document.querySelector('.tab-panel'));


//Solution in book
/*   function asTabs(node) {
    let tabs = Array.from(node.children).map((node) => {
      let button = document.createElement('button');
      button.textContent = node.getAttribute('data-tabname');
      let tab = { node, button };
      button.addEventListener('click', () => selectTab(tab));
      return tab;
    });

    let tabList = document.createElement('div');
    for (let { button } of tabs) tabList.appendChild(button);
    node.insertBefore(tabList, node.firstChild);

    function selectTab(selectedTab) {
      for (let tab of tabs) {
        let selected = tab == selectedTab;
        tab.node.style.display = selected ? '' : 'none';
        tab.button.style.color = selected ? 'red' : '';
      }
    }
    selectTab(tabs[0]);
  } */