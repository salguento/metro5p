let canvasWidth = 840;
let canvasHeight = 616;
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
    y = p.height - getRandomInt(p.height * 0.05, p.height * 0.075);
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
      x = getRandomInt(p.width * 0.01, p.width * 0.02);
      y -= getRandomInt(p.height * 0.1, p.height * 0.125);
      p.vertex(x, y);
    }
  }
  while (x < p.width * 0.94) {
    x += getRandomInt(p.width * 0.055, p.height * 0.105);
    y = getRandomInt(p.height * 0.05, p.height * 0.125);
    p.vertex(x, y);
  }

  while (y < limitY) {
    x = p.width - getRandomInt(p.width * 0.01, p.width * 0.02);
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
