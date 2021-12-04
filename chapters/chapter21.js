
//Disk persistence
//My solution - the solution from the book is in the skillsharing folder in the filesFromBook folder
const { readFile, stat } = require('fs').promises;
const { writeFile } = require('fs');

const talksFile = './talks.json';


  async function start(port) {
    await this.getTalks();
    this.server.listen(port);
  }

  async function getTalks() {
    let savedTalks;
    let path = talksFile;
    let stats;
    try {
      stats = await stat(path);
    } catch (error) {
      if (error.code === 'ENOENT') console.log('No talks file');
    }
    if (stats) {
      savedTalks = await readFile(talksFile, 'utf8').then((text) => {
        if (text) return JSON.parse(text);
      });
    }
    if (savedTalks) {
      Object.assign(this.talks, savedTalks);
    }
  }

SkillShareServer.prototype.updated = function () {
  this.version++;
  let response = this.talkResponse();
  writeFile(talksFile, JSON.stringify(this.talks), (err) => {
    if (err) console.log(`Failed to write file: ${err}`);
    else console.log('File written.');
  });
  this.waiting.forEach((resolve) => resolve(response));
  this.waiting = [];
};

new SkillShareServer(Object.create(null)).start(8000);


//