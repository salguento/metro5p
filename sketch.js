let canvasWidth = 840;
let canvasHeight = 616;
let squareSize, color1, color2, color3, color4, color5;
let sketchInitialized = false;

// Handle form submission
document
  .getElementById("dimensions-form")
  .addEventListener("submit", function (e) {
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
    p.background(0);

    let colors = [color1, color2, color3, color4, color5];

    for (let i = 0; i < canvasWidth / squareSize; i++) {
      for (let j = 0; j < canvasHeight / squareSize; j++) {
        let randomNum1 = getRandomInt(0, 4);
        let randomNum2 = getRandomInt(0, 4);
        let randomPosition = getRandomInt(0, 1);
        while (
          randomNum1 == randomNum2 ||
          (randomNum1 == 2 && randomNum2 == 3) ||
          (randomNum1 == 3 && randomNum2 == 2)
        ) {
          randomNum2 = getRandomInt(0, 4);
        }
        if (randomPosition == 0) {
          addTriangle(
            colors[randomNum1],
            i * squareSize,
            j * squareSize,
            (i + 1) * squareSize,
            (j + 1) * squareSize,
            (i + 1) * squareSize,
            j * squareSize,
            3
          );
          addTriangle(
            colors[randomNum2],
            i * squareSize,
            j * squareSize,
            (i + 1) * squareSize,
            (j + 1) * squareSize,
            i * squareSize,
            (j + 1) * squareSize,
            4
          );
        } else {
          addTriangle(
            colors[randomNum1],
            i * squareSize,
            j * squareSize,
            squareSize * (i + 1),
            j * squareSize,
            i * squareSize,
            (j + 1) * squareSize,
            1
          );
          addTriangle(
            colors[randomNum2],
            (i + 1) * squareSize,
            j * squareSize,
            (i + 1) * squareSize,
            (j + 1) * squareSize,
            i * squareSize,
            (j + 1) * squareSize,
            2
          );
        }
      }
    }
  };

  function addTriangle(c1, x1, y1, x2, y2, x3, y3, q) {
    p.noStroke();
    p.fill(0);
    let minX = Math.min(x1, x2, x3);
    let minY = Math.min(y1, y2, y3);
    let maxX = Math.max(x1, x2, x3);
    let maxY = Math.max(y1, y2, y3);
    let gradient;
    let gValue = Math.random() * (0.55 - 0.25) + 0.25;
    if (q == 1) {
      gradient = p.drawingContext.createLinearGradient(
        maxX - squareSize / 2,
        maxY - squareSize / 2,
        minX,
        minY
      );
    } else if (q == 2) {
      gradient = p.drawingContext.createLinearGradient(
        maxX - squareSize / 2,
        maxY - squareSize / 2,
        maxX,
        maxY
      );
    } else if (q == 3) {
      gradient = p.drawingContext.createLinearGradient(
        maxX - squareSize / 2,
        maxY - squareSize / 2,
        maxX,
        minY
      );
    } else {
      gradient = p.drawingContext.createLinearGradient(
        maxX - squareSize / 2,
        maxY - squareSize / 2,
        minX,
        maxY
      );
    }

    gradient.addColorStop(0, p.color(c1));
    gradient.addColorStop(gValue, p.color(c1));
    gradient.addColorStop(1, p.color(color5));
    p.drawingContext.fillStyle = gradient;

    p.triangle(x1, y1, x2, y2, x3, y3);
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
