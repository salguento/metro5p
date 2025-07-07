let canvasWidth = 2000;
let canvasHeight = 400;
let squareSize,
  color1,
  color2,
  color3,
  color4,
  color5,
  color6,
  color7,
  color8,
  color9,
  color10;
let sketchInitialized = false;

let circs = [];
let numCircs = 2;

// Handle form submission
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get the values from the form
  canvasWidth = parseInt(document.getElementById("image-width").value);
  canvasHeight = parseInt(document.getElementById("image-height").value);
  squareSize = parseInt(document.getElementById("square-size").value);
  color1 = hexToRgb(document.getElementById("color1").value);
  color2 = hexToRgb(document.getElementById("color2").value);
  color3 = hexToRgb(document.getElementById("color3").value);
  color4 = hexToRgb(document.getElementById("color4").value);
  color5 = hexToRgb(document.getElementById("color5").value);
  color6 = hexToRgb(document.getElementById("color6").value);
  color7 = hexToRgb(document.getElementById("color7").value);
  color8 = hexToRgb(document.getElementById("color8").value);
  color9 = hexToRgb(document.getElementById("color9").value);
  color10 = hexToRgb(document.getElementById("color10").value);
  clearDiv();

  // If sketch hasn't been initialized yet, create it
  if (!sketchInitialized) {
    new p5(sketch, "sketch-holder");
    // sketchInitialized = true;
  }
  // Otherwise, resize the existing canvas
  else {
    const canvas = document.querySelector("#sketch-holder canvas");
    if (canvas) {
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
    }
  }
});

// p5.js sketch
function sketch(p) {
  p.setup = function () {
    p.angleMode(p.DEGREES);
    // Create canvas with the current dimensions
    let canvas = p.createCanvas(canvasWidth, canvasHeight);
    canvas.parent("sketch-holder");

    const COLS = 24;
    const maxH = p.height - p.height * 0.075 * 2;
    const maxW = p.width - p.height * 0.075 * 2;
    const minH = p.height * 0.075;
    const minW = p.height * 0.075;

    p.background(p.color(color10));
    p.noStroke();

    let colors = [
      color1,
      color2,
      color3,
      color4,
      color5,
      color6,
      color7,
      color8,
      color9,
      color10,
    ];

    btm_draw(p);
    top_draw(p);
    let grid = cellGrid(p, maxW, maxH, COLS);
    add_shapes(p, grid, colors, minH, minW);

    // circs = [];
    // for (i = 0; i < numCircs; i++) {
    //   c = new circObj(p.random(500, 600), i, p); // generate a random sized circObj and store it's ID for later
    //   circs.push(c); //add it to the array.
    // }

    // for (j = 0; j < numCircs; j++) {
    //   circs[j].place(circs); //try to place a circObj on the screen
    // }

    // for (k = 0; k < numCircs; k++) {
    //   // display the objects
    //   circs[k].disp();
    // }
  };
}

function btm_draw(p) {
  let x = 0;
  let y = p.height;
  p.fill(p.color(color9));
  p.beginShape();
  p.vertex(x, y);
  while (x < p.width) {
    x += getRandomInt(p.width * 0.05, p.width * 0.025);
    y = p.height - getRandomInt(p.height * 0.02, p.height * 0.075);
    p.vertex(x, y);
  }
  p.vertex(p.width, p.height);
  p.vertex(0, p.height);
  p.endShape(p.CLOSE);
}

function top_draw(p) {
  let x = 0;
  let y = 0;
  let limitY = getRandomInt(p.height * 0.64, p.height * 0.75);

  p.fill(p.color(color9));
  p.beginShape();
  p.vertex(0, 0);

  while ((y = 0 || y < p.height * 0.02)) {
    y = getRandomInt(p.height * 0.72, p.height * 0.86);
    p.vertex(x, y);

    while (y > p.height * 0.125) {
      x = getRandomInt(p.height * 0.02, p.height * 0.075);
      y -= getRandomInt(p.height * 0.1, p.height * 0.125);
      p.vertex(x, y);
    }
  }
  while (x < p.width * 0.94) {
    x += getRandomInt(p.width * 0.055, p.height * 0.105);
    y = getRandomInt(p.height * 0.02, p.height * 0.075);
    p.vertex(x, y);
  }

  while (y < limitY) {
    x = p.width - getRandomInt(p.height * 0.02, p.height * 0.075);
    y += getRandomInt(p.height * 0.01, p.height * 0.125);
    if (y > limitY) {
      p.vertex(x, y * 0.91);
    } else {
      p.vertex(x, y);
    }
  }

  p.vertex(p.width, y);
  p.vertex(p.width, 0);
  p.vertex(0, 0);

  p.endShape(p.CLOSE);
}

function add_shapes(p, grid, colors, minH, minW) {
  let x0, x1;
  let y0, y1;
  let baseX = minW;
  let baseY = minH;
  let objs = [];

  for (let i = 0; i < grid.length; i++) {
    x0 = baseX;
    x1 = x0 + grid[i].x;
    baseX = x1;
    baseY = minH;
    for (let j = 0; j < grid[i].y.length; j++) {
      y0 = baseY;
      y1 = y0 + grid[i].y[j];
      baseY = y1;

      objs.push({ x: [x0, x1], y: [y0, y1] });
      // p.beginShape();
      // p.vertex(x0, y0);
      // p.vertex(x1, y0);
      // p.vertex(x1, y1);
      // p.vertex(x0, y1);
      // p.endShape(p.CLOSE);
    }
  }

  for (let i = 0; i < objs.length; i++) {
    p.fill(p.color(colors[getRandomInt(0, 7)]));
    let nVertex = getRandomInt(3, 10);

    let points = generateShape(
      objs[i].x[0],
      objs[i].x[1],
      objs[i].y[0],
      objs[i].y[1],
      nVertex,
      p
    );

    p.beginShape();
    for (let l = 0; l < points.length; l++) {
      console.log(points.length);
      p.vertex(points[l].x, points[l].y);
      p.endShape(p.CLOSE);
    }
  }
}
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace("#", "");

  // Parse r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [r, g, b];
}

function clearDiv() {
  const div = document.getElementById("sketch-holder");
  div.replaceChildren();
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cellGrid(p, maxW, maxH, COLS) {
  let cells = [];
  let colsWeight = [];
  let rowFraction = [];
  let colsWeightSum = 0;
  for (let i = 0; i < COLS; i++) {
    let weight = getRandomInt(2, 8);
    let fraction = getRandomInt(2, 3);
    colsWeight.push(weight);
    rowFraction.push(fraction);
  }
  colsWeightSum = colsWeight.reduce((acc, num) => acc + num, 0);

  for (let i = 0; i < COLS; i++) {
    let x = 0;
    let y = [];
    x = (colsWeight[i] * maxW) / colsWeightSum;

    // if (rowFraction[i] == 1) {
    //   y.push(maxH);
    if (rowFraction[i] == 2) {
      let y0 = maxH * p.random(0.3, 0.7);
      let y1 = maxH - y0;
      y.push(y0, y1);
    } else {
      let y0 = maxH * p.random(0.25, 0.35);
      let y1 = maxH * p.random(0.25, 0.35);
      let y2 = maxH - y0 - y1;
      y.push(y0, y1, y2);
    }

    cells.push({ x: x, y: y });
  }
  return cells;
}

function generateShape(x0, x1, y0, y1, sides, p) {
  let points = [];
  if (sides == 3) {
    let v1, v2, v3;
    v1 = { x: x1, y: p.random(y0, y1) };
    v2 = { x: p.random(x0, x1), y: y1 };
    v3 = { x: x0, y: p.random(y0, y1) };
    points.push(v1, v2, v3);
  } else {
    console.log("Rectangle");
    let v1, v2, v3, v4;
    v1 = { x: p.random(x0, x1), y: y0 };
    v2 = { x: x1, y: p.random(y0, y1) };
    v3 = { x: p.random(x0, x1), y: y1 };
    v4 = { x: x0, y: p.random(y0, y1) };

    points.push(v1, v2, v3, v4);
  }
  return points;
}
