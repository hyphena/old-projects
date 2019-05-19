/*const startState = {
  tool: "draw",
  color: "#000000",
  picture: Picture.empty(60, 30, "#f0f0f0"),
  done: [],
  doneAt: 0
};

const baseTools = {draw};

const baseControls = [ToolSelect, ColorSelect];

function startPixelEditor({state = startState, tools = baseTools, controls = baseControls})
{
  let app = new PixelEditor(state, {
    tools,
    controls,
    dispatch(action)
    {
      app.setState(state);
    }
  });
  return app.dom;
}*/

var scale = 10;

class Picture
{
  /* Assigns the width, height, and array of pixels to the Picture class */
  constructor(width, height, pixels)
  {
    this.width = width;
    this.height = height;
    this.pixels = pixels;
  }
  
  /* Creates a new empty array with the specified size dimensions above
     with every "pixel" having an assigned color */
  static empty(width, height, color)
  {
    let pixels = new Array(width * height).fill(color);
    return new Picture(width, height, pixels);
  }
  
  /* Obtains the location of a pixel by using it's X and Y coords */
  pixel(x, y) { return this.pixels[x + y * this.width]; }
  
  draw(pixels)
  {
    let copy = this.pixels.slice();
    for (let {x, y, color} of pixels) { copy[x + y * this.width] = color; }
    return new Picture(this.width, this.height, copy);
  }
}

class PictureCanvas
{
  constructor(picture, pointerDown)
  {
    this.dom = elt("canvas",
    {
      onmousedown: event => this.mouse(event, pointerDown),
      ontouchstart: event => this.touch(event, pointerDown)
    });
    drawPicture(picture, this.dom, scale);
  }
  
  setState(picture)
  {
    if (this.picture == picture) return;
    this.picture = picture;
    drawPicture(this.picture, this.dom, scale);
  }
}

class PixelEditor
{
  constructor(state, config)
  {
    let {tools, controls, dispatch} = config;
    this.state = state;
    
    this.canvas = new PictureCanvas(state.picture, pos =>
    {
      let tool = tools[this.state.tool];
      let onMove = tool(pos, this.state, dispatch);
      if (onMove) return pos => onMove(pos, this.state);
    });
    
    this.controls = controls.map(Control => new Control(state, config));
    this.dom = elt("div", {}, this.canvas.dom, elt("br"), ...this.controls.reduce((a, c) => a.concat(" ", c.dom), []));
  }
  
  setState(state)
  {
    this.state = state;
    this.canvas.setState(state.picture);
    for (let ctrl of this.controls) ctrl.setState(state);
  }
}

class ToolSelect
{
  constructor(state, {tools, dispatch})
  {
    this.select = elt("select",
    {
      onchange: () => dispatch({tool: this.select.value})
    },
    ...Object .keys(tools).map(name => elt("option",
    {
      select: name == state.tool
    }, name)));
    this.dom = elt("label", null, "🖌 Tool: ", this.select);
  }
  setState(state) { this.select.value = state.tool; }
}

class ColorSelect
{
  constructor(state, {dispatch})
  {
    this.input = elt("input",
    {
      type: "color",
      value: state.color,
      onchange: () => dispatch({color: this.input.value})
    });
    this.dom = elt("label", null, "🎨 Color: ", this.input);
  }
  setState(state) { this.input.value = state.color; }
}

function updateState(state, action) { return Object.assign({}, state, action); }

function elt(type, props, ...children)
{
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);
  for (let child of children)
  {
    if (typeof child != "string") dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
  }
  return dom;
}

function pointerPosition(pos, domNode)
{
  let rect = domNode.getBoundingClientRect();
  return {x: Math.floor((pos.clientX - rect.left) / scale),
          y: Math.floor(pos.clientY - rect.top / scale)};
}

function drawPicture(picture, canvas, scale)
{
  canvas.width = picture.width * scale;
  canvas.height = picture.height * scale;
  let ctx = canvas.getContext("2d");
  
  for (let y = 0; y < picture.height; y++)
  {
    for (let x = 0; x < picture.width; x++)
    {
      ctx.fillStyle = picture.pixel(x, y);
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  }
}

function draw(pos, state, dispatch)
{
  function drawPixel({x, y}, state)
  {
    let drawn = {x, y, color: state.color};
    dispatch({picture: state.picture.draw([drawn])});
  }
  drawPixel(pos, state);
  return drawPixel;
}

PictureCanvas.prototype.mouse = function(downEvent, onDown)
{
  if (downEvent.button != 0) return;
  let pos = pointerPosition(downEvent, this.dom);
  let onMove = onDown(pos);
  if (!onMove) return;
  
  let move = moveEvent =>
  {
    if (moveEvent.buttons == 0)
    {
      this.dom.removeEventListener("mousemove", move);
    }
    else
    {
      let newPos = pointerPosition(moveEvent, this.dom);
      if (newPos.x == pos.x && newPos.y == pos.y) return;
      pos = newPos;
      onMove(newPos);
    }
  };
  this.dom.addEventListener("mousemove", move);
};

PictureCanvas.prototype.touch = function(startEvent, onDown)
{
  let pos = pointerPosition(startEvent.touches[0], this.dom);
  let onMove = onDown(pos);
  startEvent.preventDefault();
  if (!onMove) return;
  
  let move = moveEvent =>
  {
    let newPos = pointerPosition(moveEvent.touches[0], this.dom);
    if (newPos.x == pos.x && newPos.y == pos.y) return;
    pos = newPos;
    onMove(newPos);
  };
  
  let end = () =>
  {
    this.dom.removeEventListener("touchmove", move);
    this.dom.removeEventListener("touchend", end);
  };
  
  this.dom.addEventListener("touchmove", move);
  this.dom.addEventListener("touchend", end);
};
