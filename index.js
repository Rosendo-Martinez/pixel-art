const CANVAS_TYPES = {
    square: {
        rowsRatio: 1,
        columnsRatio: 1,
        baseWidth: 250,
        baseHeight: 250
    },
    portrait: {
        rowsRatio: 3,
        columnsRatio: 2,
        baseWidth: 200,
        baseHeight: 300
    },
    landscape: {
        rowsRatio: 2,
        columnsRatio: 3,
        baseWidth: 300,
        baseHeight: 200
    },
};
const LEFT_CLICK_BUTTON_CODE = 0;
const canvasContainer = document.querySelector('#canvas-container');
const colorPicker = document.querySelector('#color-picker');
const eraseButton = document.querySelector('#erase-button');
const resetCanvasButton = document.querySelector('#reset-canvas-button');
const pixelDensityInput = document.querySelector('#pixel-density-input');
const canvasBgColorInput = document.querySelector('#canvas-bgColor-input');
const canvasTypeRadios = document.querySelectorAll('.canvas-type-radio-input');
const canvasSizeFactorInput = document.querySelector('#canvas-size-factor-input');
const canvasProperties = {
    height: 500,
    width: 500,
    backgroundColor: 'red',
    columns: 6,
    rows: 6,
    columnsRatio: 1,
    rowsRatio: 1,
    pixelDensityFactor: 5,
    canvasSizeFactor: 2.25,
    type: 'square'
};
let isLeftClickPressed = false;
let paintingColor = `black`;
let isErasing = false;
let canvas = createCanvas(canvasProperties.height, canvasProperties.width, canvasProperties.backgroundColor, canvasProperties.columns,canvasProperties.rows);

preventElementDragging();
renderCanvasToDOMContainer(canvasContainer, canvas);

canvasTypeRadios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
            updateRadios(canvasTypeRadios, e.target);
            updateCanvasType(e.target.value);
        }
    );
});

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
    canvas = createCanvas(canvasProperties.height, canvasProperties.width, canvasProperties.backgroundColor, canvasProperties.columns,canvasProperties.rows);
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
    eraseButton.classList.toggle('erase');
};

function updatePixelDensity(newPixelDensityFactor) {
    canvasProperties.rows = newPixelDensityFactor * canvasProperties.rowsRatio;
    canvasProperties.columns = newPixelDensityFactor * canvasProperties.columnsRatio;
    canvasProperties.pixelDensityFactor = newPixelDensityFactor;
    resetCanvas();
};

function updateCanvasBgColor(color) {
    canvasProperties.backgroundColor = color;
    resetCanvas();
};

function updateCanvasType(type) {
    canvasProperties.rowsRatio = CANVAS_TYPES[type].rowsRatio;
    canvasProperties.columnsRatio = CANVAS_TYPES[type].columnsRatio;
    canvasProperties.width = CANVAS_TYPES[type].baseWidth * canvasProperties.canvasSizeFactor;
    canvasProperties.height = CANVAS_TYPES[type].baseHeight * canvasProperties.canvasSizeFactor;
    canvasProperties.rows = canvasProperties.rowsRatio * canvasProperties.pixelDensityFactor;
    canvasProperties.columns = canvasProperties.columnsRatio * canvasProperties.pixelDensityFactor;
    canvasProperties.type = type;
    resetCanvas();
}

function updateRadios(radios, checkedRadio) {
    radios.forEach((radio) => {
        if (radio.checked && (radio.value !== checkedRadio.value)) {
            radio.checked = false;
        };
    });
};

function preventElementDragging() {
    // prevents dragging pixels bug from occurring
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
};

function updateCanvasSize(newSizeFactor) {
    if (newSizeFactor == 1) {
        newSizeFactor = 1.5;
    } else if (newSizeFactor == 2) {
        newSizeFactor = 2.25;
    } else if (newSizeFactor == 3) {
        newSizeFactor = 2.75;
    }
    canvasProperties.width = CANVAS_TYPES[canvasProperties.type].baseWidth * newSizeFactor;
    canvasProperties.height = CANVAS_TYPES[canvasProperties.type].baseHeight * newSizeFactor;
    canvasProperties.canvasSizeFactor = newSizeFactor;
    resetCanvas();
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

pixelDensityInput.addEventListener('change', function(e) {
    if (e.target.value !== '') {
        const num = Number.parseInt(e.target.value);
        if (num >= 1 && num <= 100) {
            updatePixelDensity(num);
        };
    };
});

canvasBgColorInput.addEventListener('change', function(e) {
    updateCanvasBgColor(e.target.value);
});

canvasSizeFactorInput.addEventListener('change', function(e) {
    updateCanvasSize(e.target.value);
});