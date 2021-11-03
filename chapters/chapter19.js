//Keyboard bindings
//My solution

this.dom = elt(
  'div',
  { tabIndex: 0 },
  this.canvas.dom,
  elt('br'),
  ...this.controls.reduce((a, c) => a.concat(' ', c.dom), [])
);

this.dom.addEventListener('keydown', (event) => {
  if (event.key === 'z' && (event.metaKey || event.ctrlKey)) {
    dispatch({ undo: true });
  }
});

//Solution in book

