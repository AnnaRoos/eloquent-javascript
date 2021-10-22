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

const textArea = document.querySelector('#code');
const button = document.querySelector('#button');
const output = document.querySelector('#output');

const createFunction = () => {
 let newFunction 
  try {
    newFunction = Function('', textArea.value);
  } catch (error) {
    return (output.innerHTML = error);
  }
  try {
    return (output.innerHTML = newFunction());
  } catch (error) {
    return (output.innerHTML = error);
  }
};

button.addEventListener('click', createFunction);
