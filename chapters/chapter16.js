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

//My solution
//Had to sneekpeak at the solution halfway through
function runLevel(level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  return new Promise((resolve) => {
    let isPaused = false;
    const pauseHandler = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (isPaused) {
          runAnimation(start);
          isPaused = false;
        } else {
          isPaused = true;
        }
      }
    };

    window.addEventListener('keydown', pauseHandler);
    const arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp']);

    const start = (time) => {
      if (isPaused) return false;
      state = state.update(time, arrowKeys);
      display.syncState(state);

      if (state.status == 'playing') {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        window.removeEventListener('keydown', escHandler);
        arrowKeys.unregister();
        resolve(state.status);
        return false;
      }
    };

    runAnimation(start);
  });
}

function trackKeys(keys) {
  let down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == 'keydown';
      event.preventDefault();
    }
  }
  window.addEventListener('keydown', track);
  window.addEventListener('keyup', track);
  down.unregister = () => {
    window.removeEventListener('keydown', track);
    window.removeEventListener('keyup', track);
  };
  return down;
}

//Solution in book
function runLevel(level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  let running = 'yes';

  return new Promise((resolve) => {
    function escHandler(event) {
      if (event.key != 'Escape') return;
      event.preventDefault();
      if (running == 'no') {
        running = 'yes';
        runAnimation(frame);
      } else if (running == 'yes') {
        running = 'pausing';
      } else {
        running = 'yes';
      }
    }
    window.addEventListener('keydown', escHandler);
    let arrowKeys = trackKeys(['ArrowLeft', 'ArrowRight', 'ArrowUp']);

    function frame(time) {
      if (running == 'pausing') {
        running = 'no';
        return false;
      }

      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status == 'playing') {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        window.removeEventListener('keydown', escHandler);
        arrowKeys.unregister();
        resolve(state.status);
        return false;
      }
    }
    runAnimation(frame);
  });
}

function trackKeys(keys) {
  let down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == 'keydown';
      event.preventDefault();
    }
  }
  window.addEventListener('keydown', track);
  window.addEventListener('keyup', track);
  down.unregister = () => {
    window.removeEventListener('keydown', track);
    window.removeEventListener('keyup', track);
  };
  return down;
}
