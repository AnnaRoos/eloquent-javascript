//Search tool
//My solution (did not know how to make in from scratch so changed the solution from sync to async instead)

const { stat, readdir, readFile } = require('fs').promises;

const searchTerm = new RegExp(process.argv[2]);

const search = async (file) => {
  let stats = await stat(file);
  if (stats.isDirectory()) {
    for (let f of await readdir(file)) {
      search(file + '/' + f);
    }
  } else if (searchTerm.test(await readFile(file, 'utf8'))) {
    console.log(file);
  }
};

for (let arg of process.argv.slice(3)) {
  search(arg);
}

//Solution in book
/* const { statSync, readdirSync, readFileSync } = require('fs');

let searchTerm = new RegExp(process.argv[2]);

for (let arg of process.argv.slice(3)) {
  search(arg);
}

function search(file) {
  let stats = statSync(file);
  if (stats.isDirectory()) {
    for (let f of readdirSync(file)) {
      search(file + '/' + f);
    }
  } else if (searchTerm.test(readFileSync(file, 'utf8'))) {
    console.log(file);
  }
}
 */

//Directory creation
//My solution

const { mkdir } = require('fs').promises;

methods.MKCOL = async function (request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await mkdir(path);
      return { status: 204 };
    } else throw error;
  }
  if (stats.isDirectory()) return { status: 204 };
};

//Solution in book
const { mkdir } = require('fs').promises;

methods.MKCOL = async function (request) {
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await stat(path);
  } catch (error) {
    if (error.code != 'ENOENT') throw error;
    await mkdir(path);
    return { status: 204 };
  }
  if (stats.isDirectory()) return { status: 204 };
  else return { status: 400, body: 'Not a directory' };
};

//A public space on the web
//Will do this as a separate project

