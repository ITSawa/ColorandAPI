document.addEventListener("DOMContentLoaded", () => {
  const modes = ["hex", "rgb", "rgba"];
  let currentMode = 0; // Index for the current color mode
  let currentColor = generateRandomHexColor(); // Initial color in hex format

  function generateRandomHexColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r},${g},${b})`;
  }

  function hexToRgba(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    const a = Math.random().toFixed(2);
    return `rgba(${r},${g},${b},${a})`;
  }

  function convertColor(color, format) {
    switch (format) {
      case "rgb":
        return hexToRgb(color);
      case "rgba":
        return hexToRgba(color);
      case "hex":
      default:
        return color;
    }
  }

  function generateRandomColor() {
    const color = generateRandomHexColor();
    currentColor = color; // Store the new color in hex format
    return convertColor(color, modes[currentMode]);
  }

  const canvas = document.getElementById("canvas");
  const body = document.querySelector("body");
  const colorInput = document.getElementById("color-input");
  const copyButton = document.getElementById("copy");
  const modeButton = document.getElementById("mode");

  const setCanvasColor = (color) => {
    canvas.style.backgroundColor = color;
    body.style.backgroundColor = color;
  };

  const setGeneratedColor = () => {
    const color = generateRandomColor();
    colorInput.value = color;
    setCanvasColor(color);
  };

  const generateButton = document.getElementById("generate");
  generateButton.addEventListener("click", () => {
    setGeneratedColor();
  });

  setGeneratedColor(); // Initial color generation

  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(colorInput.value);
  });

  modeButton.addEventListener("click", () => {
    currentMode = (currentMode + 1) % modes.length;
    modeButton.textContent = `Mode: ${modes[currentMode]}`;
    const convertedColor = convertColor(currentColor, modes[currentMode]);
    colorInput.value = convertedColor;
    setCanvasColor(convertedColor);
  });

  // Initialize mode button text
  modeButton.textContent = `Mode: ${modes[currentMode]}`;
});
