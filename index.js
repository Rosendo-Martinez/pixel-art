const canvasContainer = document.querySelector('#canvas-container');

function createCanvas(height, width, bgColor) {
    const canvas = document.createElement('div');
    canvas.style.height = `${height}px`;
    canvas.style.width = `${width}px`;
    canvas.style.backgroundColor = bgColor;
    return canvas;
};

function renderCanvas(canvasContainer, canvas) {
    canvasContainer.appendChild(canvas);
};