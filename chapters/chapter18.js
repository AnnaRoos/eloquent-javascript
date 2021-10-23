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

const grid = document.querySelector('#grid');
const nextGenButton = document.querySelector('#next');

class State {
  constructor(rows) {
    this.rows = rows;
  }
}



const createGrid = (rows, columns) => {
  let table = document.createElement('table');
  for (let y = 0; y < rows; y++) {
    let tableRow = document.createElement('tr');
    for (let x = 0; x < columns; x++) {
      let tableData = document.createElement('td');
      let input = document.createElement('input');
      input.type = 'checkbox';
      input.id = `${x}${y}`;
      tableData.appendChild(input);
      tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
  }
  return table;
};




grid.appendChild(createGrid(10, 10));


const createNextGen = () => {
  console.log(grid.children);
};
grid.addEventListener('click', (event) => {
  console.log(event.target.id);
});

nextGenButton.addEventListener('click', createNextGen);