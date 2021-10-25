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

const getNeighbors = (x, y) => {
  let neighbors = [];

  if (x != 0) neighbors.push(`${x - 1}${y}`);
  if (y != 0) neighbors.push(`${x}${y - 1}`);
  if (x != columns - 1) neighbors.push(`${x + 1}${y}`);
  if (y != rows - 1) neighbors.push(`${x}${y + 1}`);
  if (x != 0 && y != rows - 1) neighbors.push(`${x - 1}${y + 1}`);
  if (y != 0 && x != columns - 1) neighbors.push(`${x + 1}${y - 1}`);
  if (x != 0 && y != 0) neighbors.push(`${x - 1}${y - 1}`);
  if (y != rows - 1 && x != columns - 1) neighbors.push(`${x + 1}${y + 1}`);

  return neighbors;
};

const createGeneration = (type = 'random') => {
  let oldGen;
  if (type === 'next') {
    oldGen = createGeneration('current');
  }
  let generation = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      if (type === 'random') {
        if (Math.random() * 10 > 6) {
          generation.push(`${x}${y}`);
        }
      }
      if (type === 'current') {
        let currentBox = document.getElementById(`${x}${y}`);
        if (currentBox.checked) {
          generation.push(currentBox.id);
        }
      }
      if (type === 'next') {
        let neighbors = getNeighbors(x, y);
        let livingNeighbors = neighbors.filter((el) => oldGen.includes(el));

        if (
          (oldGen.includes(`${x}${y}`) && livingNeighbors.length === 3) ||
          (oldGen.includes(`${x}${y}`) && livingNeighbors.length === 2)
        ) {
          generation.push(`${x}${y}`);
        }

        if (!oldGen.includes(`${x}${y}`) && livingNeighbors.length === 3) {
          generation.push(`${x}${y}`);
        }
      }
    }
  }
  return generation;
};

const createPlayingField = (gen) => {
  let table = document.createElement('table');
  for (let y = 0; y < rows; y++) {
    let tableRow = document.createElement('tr');
    for (let x = 0; x < columns; x++) {
      let tableData = document.createElement('td');
      let input = document.createElement('input');
      input.type = 'checkbox';
      input.id = `${x}${y}`;
      if (gen.includes(input.id)) {
        input.checked = true;
      }
      tableData.appendChild(input);
      tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
  }
  return table;
};

window.addEventListener('load', () => {
  let startGen = createGeneration();
  grid.appendChild(createPlayingField(startGen));
});

nextGenButton.addEventListener('click', () => {
  let nextGen = createGeneration('next');
  grid.removeChild(document.querySelector('table'));
  grid.appendChild(createPlayingField(nextGen));
});
