//Content negotiation
const URL = 'https://eloquentjavascript.net/author';
const acceptTypes = [
  'text/plain',
  'text/html',
  'application/json',
  'application/rainbows+unicorns',
];

const getResponseTypes = async (types) => {
  for (let type of types) {
    let response = await fetch('https://eloquentjavascript.net/author', {
      headers: { Accept: type },
    });
    console.log(await response.text());
  }
};

/* getResponseTypes(acceptTypes); */

//A JavaScript workbench
//My solution
const textArea = document.querySelector('#code');
const button = document.querySelector('#button');
const output = document.querySelector('#output');

const createFunction = () => {
  let newFunction;
  try {
    newFunction = Function('', textArea.value);
    output.innerHTML = newFunction();
  } catch (error) {
    output.innerHTML = error;
  }
};

button.addEventListener('click', createFunction);

//Solution in book
/* document.querySelector('#button').addEventListener('click', () => {
  let code = document.querySelector('#code').value;
  let outputNode = document.querySelector('#output');
  try {
    let result = Function(code)();
    outputNode.innerText = String(result);
  } catch (e) {
    outputNode.innerText = 'Error: ' + e;
  }
}); */

//Conway’s game of life
//My solution
const grid = document.querySelector('#grid');
const nextGenButton = document.querySelector('#next');

let rows = 10;
let columns = 10;
let currentGeneration = [];

const randomGeneration = () => {
  let randomGen = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (Math.random() * 10 > 5) {
        randomGen.push(`${x}${y}`);
      }
    }
  }
  return randomGen;
};

const createPlayingField = (nextGen = null) => {
  currentGeneration = nextGen || randomGeneration();
  let table = document.createElement('table');
  for (let y = 0; y < rows; y++) {
    let tableRow = document.createElement('tr');
    for (let x = 0; x < columns; x++) {
      let tableData = document.createElement('td');
      let input = document.createElement('input');
      input.type = 'checkbox';
      input.id = `${x}${y}`;
      if (currentGeneration.includes(input.id)) {
        input.checked = true;
      }
      tableData.appendChild(input);
      tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
  }
  return table;
};

const checkHandler = (event) => {
  if (event.target.checked) currentGeneration.push(event.target.id);
  else if (!event.target.checked) {
    let filtered = currentGeneration.filter((el) => el !== event.target.id);
    currentGeneration = filtered;
  }
};

const nextGenHandler = () => {
  let newGen = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let neighbors = [];
      let currentbox = document.getElementById(`${x}${y}`);

      if (x != 0) neighbors.push(`${x - 1}${y}`);
      if (y != 0) neighbors.push(`${x}${y - 1}`);
      if (x != columns) neighbors.push(`${x + 1}${y}`);
      if (y != rows) neighbors.push(`${x}${y + 1}`);
      if (x != 0 && y != rows) neighbors.push(`${x - 1}${y + 1}`);
      if (y != 0 && x != columns) neighbors.push(`${x + 1}${y - 1}`);
      if (x != 0 && y != 0) neighbors.push(`${x - 1}${y - 1}`);
      if (y != rows && x != columns)
        neighbors.push(`${x + 1}${y + 1}`);

      let livingNeighbors = neighbors.filter((el) => currentGeneration.includes(el));

      if (
        (currentbox.checked && livingNeighbors.length === 3) || currentbox.checked &&
        livingNeighbors.length === 2
      ) {
        newGen.push(currentbox.id);
      }
      if (!currentbox.checked && livingNeighbors.length === 3) {
        newGen.push(currentbox.id);
      }
    }
  }
  grid.removeChild(document.querySelector('table'));
  grid.appendChild(createPlayingField(newGen));
};



window.addEventListener('load', () => {
  grid.appendChild(createPlayingField());
});

grid.addEventListener('click', checkHandler);
nextGenButton.addEventListener('click', nextGenHandler);
