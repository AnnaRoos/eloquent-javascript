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
