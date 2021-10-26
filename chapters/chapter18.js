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

//Solution from book

//This solution also included an auto button:
<button id="run">Auto run</button>;

const width = 30,
  height = 15;

// I will represent the grid as an array of booleans.

let gridNode = document.querySelector('#grid');
// This holds the checkboxes that display the grid in the document.
let checkboxes = [];
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    let box = document.createElement('input');
    box.type = 'checkbox';
    gridNode.appendChild(box);
    checkboxes.push(box);
  }
  gridNode.appendChild(document.createElement('br'));
}

function gridFromCheckboxes() {
  return checkboxes.map((box) => box.checked);
}
function checkboxesFromGrid(grid) {
  grid.forEach((value, i) => (checkboxes[i].checked = value));
}
function randomGrid() {
  let result = [];
  for (let i = 0; i < width * height; i++) {
    result.push(Math.random() < 0.3);
  }
  return result;
}

checkboxesFromGrid(randomGrid());

// This does a two-dimensional loop over the square around the given
// x,y position, counting all fields that have a cell but are not the
// center field.
function countNeighbors(grid, x, y) {
  let count = 0;
  for (let y1 = Math.max(0, y - 1); y1 <= Math.min(height - 1, y + 1); y1++) {
    for (let x1 = Math.max(0, x - 1); x1 <= Math.min(width - 1, x + 1); x1++) {
      if ((x1 != x || y1 != y) && grid[x1 + y1 * width]) {
        count++;
      }
    }
  }
  return count;
}

function nextGeneration(grid) {
  let newGrid = new Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let neighbors = countNeighbors(grid, x, y);
      let offset = x + y * width;
      if (neighbors < 2 || neighbors > 3) {
        newGrid[offset] = false;
      } else if (neighbors == 2) {
        newGrid[offset] = grid[offset];
      } else {
        newGrid[offset] = true;
      }
    }
  }
  return newGrid;
}

function turn() {
  checkboxesFromGrid(nextGeneration(gridFromCheckboxes()));
}

document.querySelector('#next').addEventListener('click', turn);

let running = null;
document.querySelector('#run').addEventListener('click', () => {
  if (running) {
    clearInterval(running);
    running = null;
  } else {
    running = setInterval(turn, 400);
  }
});
