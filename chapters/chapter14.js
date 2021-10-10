//Build a table

const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
];

function elt(type, ...children) {
  let node = document.createElement(type);
  for (let child of children) {
    if (typeof child != 'string') node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
}

//My solution - using the elt-function from the chapter
const createTable = (arr) => {
  let table = elt('table');
  let tableHeadings = elt('tr');
  for (const key in arr[0]) {
    let heading = elt('th', key);
    tableHeadings.appendChild(heading);
  }
  table.appendChild(tableHeadings);
  for (const obj of MOUNTAINS) {
    let row = elt('tr');
    for (const el in obj) {
      let tableData = elt('td', obj[el].toString());
      if (typeof obj[el] === 'number') {
        tableData.style.textAlign = 'right';
      }
      row.appendChild(tableData);
    }
    table.appendChild(row);
  }
  return table;
};

const mountainDiv = document.getElementById('mountains');
mountainDiv.appendChild(createTable(MOUNTAINS));

//Solution in book
function buildTable(data) {
  let table = document.createElement('table');

  let fields = Object.keys(data[0]);
  let headRow = document.createElement('tr');
  fields.forEach(function (field) {
    let headCell = document.createElement('th');
    headCell.appendChild(document.createTextNode(field));
    headRow.appendChild(headCell);
  });
  table.appendChild(headRow);

  data.forEach(function (object) {
    let row = document.createElement('tr');
    fields.forEach(function (field) {
      let cell = document.createElement('td');
      cell.appendChild(document.createTextNode(object[field]));
      if (typeof object[field] == 'number') {
        cell.style.textAlign = 'right';
      }
      row.appendChild(cell);
    });
    table.appendChild(row);
  });

  return table;
}

//Elements by tag name

//My solution
const byTagName = (node, tagName) => {
  let result = [];
  if (node.childNodes.length === 0) return result;
  for (let child of node.childNodes) {
     if (child.nodeName.toLowerCase() === tagName) {
       result = result.concat(child);
     }
    result = result.concat(byTagName(child, tagName));
  }
  return result;
};

//Solution in book
function byTagName2(node, tagName) {
  let found = [];
  tagName = tagName.toUpperCase();

  function explore(node) {
    for (let i = 0; i < node.childNodes.length; i++) {
      let child = node.childNodes[i];
      if (child.nodeType == document.ELEMENT_NODE) {
        if (child.nodeName == tagName) found.push(child);
        explore(child);
      }
    }
  }

  explore(node);
  return found;
}

//Added extra tests to see whether the function should include or exclude the element it was called on
//and to see if it could find an element within another element with the same tag name
console.log(byTagName(document.body, 'h1').length);
// → 2
console.log(byTagName(document.body, 'span').length);
// → 5
let para = document.querySelector('p');
console.log(byTagName(para, 'span').length);
// → 2
console.log(byTagName(para, 'p').length);
// → 0

let testing = document.querySelector('#test');
console.log(test.getElementsByTagName('span').length);
// → 2
