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

const rows = 16;
const columns = 16;

const createGeneration = (type = 'random') => {
  let generation = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (type === 'random') {
        if (Math.random() * 10 > 5) {
          generation.push(`${x}${y}`);
        }
      }
      if (type === 'current') {
        let currentBox = document.getElementById(`${x}${y}`);
        if (currentBox.checked) {
          generation.push(currentBox.id);
        }
      }
    }
  }
  return generation;
};

const createPlayingField = (nextGen = null) => {
  let living = nextGen || createGeneration();
  let table = document.createElement('table');
  for (let y = 0; y < rows; y++) {
    let tableRow = document.createElement('tr');
    for (let x = 0; x < columns; x++) {
      let tableData = document.createElement('td');
      let input = document.createElement('input');
      input.type = 'checkbox';
      input.id = `${x}${y}`;
      if (living.includes(input.id)) {
        input.checked = true;
      }
      tableData.appendChild(input);
      tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
  }
  return table;
};


const nextGenHandler = () => {
  let oldGen = createGeneration('current');
  let newGen = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      let neighbors = [];
      let currentBox = document.getElementById(`${x}${y}`);

      if (x != 0) neighbors.push(`${x - 1}${y}`);
      if (y != 0) neighbors.push(`${x}${y - 1}`);
      if (x != columns - 1) neighbors.push(`${x + 1}${y}`);
      if (y != rows - 1) neighbors.push(`${x}${y + 1}`);
      if (x != 0 && y != rows - 1) neighbors.push(`${x - 1}${y + 1}`);
      if (y != 0 && x != columns - 1) neighbors.push(`${x + 1}${y - 1}`);
      if (x != 0 && y != 0) neighbors.push(`${x - 1}${y - 1}`);
      if (y != rows - 1 && x != columns - 1) neighbors.push(`${x + 1}${y + 1}`);

      let livingNeighbors = neighbors.filter((el) => oldGen.includes(el));

      if (
        (currentBox.checked && livingNeighbors.length === 3) ||
        (currentBox.checked && livingNeighbors.length === 2)
      ) {
        newGen.push(currentBox.id);
      }
      if (!currentBox.checked && livingNeighbors.length === 3) {
        newGen.push(currentBox.id);
      }
    }
  }
  grid.removeChild(document.querySelector('table'));
  grid.appendChild(createPlayingField(newGen));
};

window.addEventListener('load', () => {
  grid.appendChild(createPlayingField());
});
nextGenButton.addEventListener('click', nextGenHandler);
