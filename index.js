const canvasContainer = document.querySelector('#canvas-container');

function createCanvas(canvasHeight, canvasWidth, bgColor, pixelColumns, pixelRows) {
    const canvas = document.createElement('div');
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.backgroundColor = bgColor;
    renderPixelsToCanvas(canvasHeight, canvasWidth, pixelColumns, pixelRows, canvas);
    return canvas;
};

function renderCanvasToDOMContainer(canvasContainer, canvas) {
    canvasContainer.appendChild(canvas);
};

function createPixels(canvasHeight, canvasWidth, pixelColumns, pixelRows) {
    const pixelHeight = canvasHeight / pixelRows;
    const pixelWidth = canvasWidth / pixelColumns;
    const numberOfPixels = pixelColumns * pixelRows;
    const pixels = new Array(numberOfPixels).fill('').map(() => createPixel(pixelWidth, pixelHeight));
    return pixels;
};

function createPixel(pixelHeight, pixelWidth) {
    const pixel = document.createElement('div');
    pixel.style.height = `${pixelHeight}px`;
    pixel.style.width = `${pixelWidth}px`;
    return pixel;
};

function renderPixelsToCanvas(canvasHeight, canvasWidth, pixelColumns, pixelRows, canvas) {
    const pixels = createPixels(canvasHeight, canvasWidth, pixelColumns, pixelRows);
    for (let i = 0; i < pixels.length; i++) {
        canvas.appendChild(pixels[i]);
    };
};