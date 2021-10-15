//Game over
//My solution
async function runGame(plans, Display) {
  let lives = 3;
  for (let level = 0; level < plans.length; ) {
    console.log(`Lives left: ${lives}`);
    let status = await runLevel(new Level(plans[level]), Display);
    if (status === 'won') level++;
    if (status === 'lost') lives--;
    if (lives === 0) {
      (level = 0), (lives = 3);
    }
  }
  console.log("You've won!");
}

//Solution in book
/* async function runGame(plans, Display) {
  let lives = 3;
  for (let level = 0; level < plans.length && lives > 0; ) {
    console.log(`Level ${level + 1}, lives: ${lives}`);
    let status = await runLevel(new Level(plans[level]), Display);
    if (status == 'won') level++;
    else lives--;
  }
  if (lives > 0) {
    console.log("You've won!");
  } else {
    console.log('Game over');
  }
} */

//Pausing the game

let pause = false;
const pauseHandler = (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    return pause ? false : true;
  }
};
  
window.addEventListener('keydown', pauseHandler);


function runLevel(level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  return new Promise((resolve) => {
    runAnimation((time) => {
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status == 'playing') {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else if (pause) {
        return false;
      } else {
        display.clear();
        resolve(state.status);
        return false;
      }
    });
  });
}
