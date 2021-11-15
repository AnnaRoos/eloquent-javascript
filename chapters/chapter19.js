//Keyboard bindings
//My solution (forgot the)

this.dom = elt(
  'div',
  { tabIndex: 0 },
  this.canvas.dom,
  elt('br'),
  ...this.controls.reduce((a, c) => a.concat(' ', c.dom), [])
);

this.dom.addEventListener('keydown', (event) => {
  if (event.key === 'z' && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();
    dispatch({ undo: true });
  } else if (!event.ctrlKey && !event.metaKey && !event.altKey) {
    for (let tool of Object.keys(tools)) {
      if (event.key === tool[0]) {
        event.preventDefault();
        dispatch({ tool });
      }
    }
  }
});

//Solution in book

this.dom = elt(
  'div',
  {
    tabIndex: 0,
    onkeydown: (event) => this.keyDown(event, config),
  },
  this.canvas.dom,
  elt('br'),
  ...this.controls.reduce((a, c) => a.concat(' ', c.dom), [])
);

function keyDown(event, config) {
  if (event.key == 'z' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    config.dispatch({ undo: true });
  } else if (!event.ctrlKey && !event.metaKey && !event.altKey) {
    for (let tool of Object.keys(config.tools)) {
      if (tool[0] == event.key) {
        event.preventDefault();
        config.dispatch({ tool });
        return;
      }
    }
  }
}

//Efficient drawing

//My solution
PictureCanvas.prototype.syncState = function (picture) {
  if (this.picture == picture) return;
  this.picture = picture;
  drawPicture(this.picture, this.dom, scale, this.picture);
  this.picture = picture;
};

function drawPicture(picture, canvas, scale, prevPicture = null) {
  if (
    picture.width != prevPicture.width ||
    picture.height != prevPicture.height
  ) {
    prevPicture = null;
  }
  canvas.width = picture.width * scale;
  canvas.height = picture.height * scale;
  let cx = canvas.getContext('2d');

  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      if (
        prevPicture === null ||
        picture.pixel(x, y) === prevPicture.pixel(x, y)
      ) {
        continue;
      }
      cx.fillStyle = picture.pixel(x, y);
      cx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}

//Solution in book
PictureCanvas.prototype.syncState = function (picture) {
  if (this.picture == picture) return;
  drawPicture(picture, this.dom, scale, this.picture);
  this.picture = picture;
};

function drawPicture(picture, canvas, scale, previous) {
  if (
    previous == null ||
    previous.width != picture.width ||
    previous.height != picture.height
  ) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    previous = null;
  }

  let cx = canvas.getContext('2d');
  for (let y = 0; y < picture.height; y++) {
    for (let x = 0; x < picture.width; x++) {
      let color = picture.pixel(x, y);
      if (previous == null || previous.pixel(x, y) != color) {
        cx.fillStyle = color;
        cx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }
}

//Circles
//My solution
//Not finished

function circle(pos, state, dispatch) {
  function drawCircle(size) {
      let radius = Math.sqrt(
        Math.pow(size.x - pos.x, 2) + Math.pow(size.y - pos.y, 2)
      );
    let drawn = [];
    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        drawn.push({ x, y, color: state.color });
      }
    }
    dispatch({ picture: state.picture.draw(drawn) });
  }
  drawCircle(pos);
  return drawCircle;
}
