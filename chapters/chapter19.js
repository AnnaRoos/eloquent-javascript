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

keyDown(event, config) {
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
