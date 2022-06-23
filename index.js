const LEFT_CLICK_BUTTON_CODE = 0;
const canvasContainer = document.querySelector('#canvas-container');
const colorPicker = document.querySelector('#color-picker');
const eraseButton = document.querySelector('#erase-button');
const resetCanvasButton = document.querySelector('#reset-canvas-button');
let isLeftClickPressed = false;
let paintingColor = `black`;
let isErasing = false;
let canvas = createCanvas(500, 500, 'red', 10, 10);

renderCanvasToDOMContainer(canvasContainer, canvas);

function createCanvas(canvasHeight, canvasWidth, bgColor, pixelColumns, pixelRows) {
    const canvas = document.createElement('div');
    canvas.setAttribute('id', 'canvas');
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.backgroundColor = bgColor;
    renderPixelsToCanvas(canvasHeight, canvasWidth, pixelColumns, pixelRows, canvas);
    return canvas;
};

function renderCanvasToDOMContainer(canvasContainer, canvas) {
    canvasContainer.appendChild(canvas);
};

function resetCanvas() {
    canvasContainer.removeChild(canvas);
    canvas = createCanvas(500, 500, 'red', 10, 10);
    renderCanvasToDOMContainer(canvasContainer, canvas);
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
    pixel.addEventListener('mouseover', function(e) {
        if (isLeftClickPressed) {
            setPixelBackgroundColor(e.target);
        };
    });
    pixel.addEventListener('click', function(e) {
        setPixelBackgroundColor(e.target);
    });
    pixel.addEventListener('mousedown', function(e) {
        setPixelBackgroundColor(e.target);
    });
    return pixel;
};

function renderPixelsToCanvas(canvasHeight, canvasWidth, pixelColumns, pixelRows, canvas) {
    const pixels = createPixels(canvasHeight, canvasWidth, pixelColumns, pixelRows);
    for (let i = 0; i < pixels.length; i++) {
        canvas.appendChild(pixels[i]);
    };
};

function setPixelBackgroundColor(pixel) {
    if (isErasing) {
        pixel.style.backgroundColor = 'inherit';
    } else {
        pixel.style.backgroundColor = paintingColor;
    };
};

function updatePaintingColor(color) {
    paintingColor = color;
};

function toggleEraser() {
    isErasing = !isErasing;
};

document.addEventListener('mousedown', function(e) {
    if (e.button === LEFT_CLICK_BUTTON_CODE) {
        isLeftClickPressed = true;
    };
});

document.addEventListener('mouseup', function(e) {
    if (e.button === LEFT_CLICK_BUTTON_CODE) {
        isLeftClickPressed = false;
    };
});

colorPicker.addEventListener('change', function(e) {
    updatePaintingColor(e.target.value);
})

eraseButton.addEventListener('click', toggleEraser);

resetCanvasButton.addEventListener('click', resetCanvas);

preventElementDragging();
function preventElementDragging() {
    // prevents dragging bug from occurring
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
};