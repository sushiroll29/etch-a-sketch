let gridSize;
const eraseButton = document.querySelector('.eraser');
const rainbowButton = document.querySelector('.rainbow');
const clearButton = document.querySelector(".clear");
const gridContainer = document.querySelector('.grid');
const colorPicker = document.querySelector('.color-picker');
const defaultColor = '#222222;';
const activeButton = '#eeeeee';
const inactiveButton = 'white';

//functions
function createGrid(gridSize) {
    for(let i = 0; i < gridSize; i++){
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        for(let j = 0; j < gridSize; j++) {
            const gridCol = document.createElement('div');
            gridCol.classList.add('grid-col');
            gridRow.appendChild(gridCol);
            
    }
    gridContainer.appendChild(gridRow);
    }
draw();
pickColor();
rainbow();
erase();
clear();
}

function setSquareColor(color) {
    const squares = gridContainer.querySelectorAll('.grid-col');
    squares.forEach(square => square.addEventListener('mousemove', (e) => {
            if(e.buttons == 1) { //checks if the mouse button is down
                square.style.backgroundColor = color;
            }
    }));
}

function draw(){
    setSquareColor(defaultColor);
}

function pickColor() {
    colorPicker.addEventListener('input', pickColorHandler);
}

function pickColorHandler(e) {
    setSquareColor(e.target.value);
}

function clear(){
    const squares = document.querySelectorAll('.grid-col');
    clearButton.addEventListener('click', () => {
        squares.forEach(square => square.style.cssText = 'background-color: white');
    });
}

function erase(){
    eraseButton.addEventListener('click', eraseHandler);
}

function rainbow(){
    rainbowButton.addEventListener('click', rainbowHandler);
}

function changeSize() {
    const changeButton = document.querySelector(".size");
    changeButton.addEventListener('mouseup', changeSizeHandler);
}

//function calls
createGrid(30);
changeSize();

//handlers
function eraseHandler(){
    eraseButton.classList.toggle('.erase');
    colorPicker.value = defaultColor;

    if(eraseButton.classList.contains('.erase')) {
        rainbowButton.disabled = true;
        colorPicker.disabled = true;
        eraseButton.style.backgroundColor = activeButton;
        setSquareColor('white');
    } else {
        eraseButton.style.backgroundColor = inactiveButton;
        rainbowButton.disabled = false;
        colorPicker.disabled = false;
        draw();
    }
}

function rainbowHandler() {
    const squares = document.querySelectorAll('.grid-col');

    rainbowButton.classList.toggle('.color');
    colorPicker.value = defaultColor;

    if(rainbowButton.classList.contains('.color')) {
        eraseButton.disabled = true;
        colorPicker.disabled = true;
        rainbowButton.style.backgroundColor = activeButton;
        squares.forEach(square => square.addEventListener('mousemove', (e) => {
            if(e.buttons == 1) { //checks if the mouse button is down
                const randomColor = Math.floor(Math.random()*16777215).toString(16);
                square.style.backgroundColor = '#' + randomColor;
                }
            }));
    } else {
        rainbowButton.style.backgroundColor = inactiveButton;
        eraseButton.disabled = false;
        colorPicker.disabled = false;
        draw();
        }
}

function changeSizeHandler(){
    let cols = document.querySelectorAll('.grid-col');
    let rows = document.querySelectorAll('.grid-row');
    let newGridSize = prompt("What size do you want the new grid to be? (max. 100)");
    if(newGridSize === null) return; //stops grid from disappearing if selecting 'cancel'

    colorPicker.value = defaultColor;

    rainbowButton.removeEventListener('click', rainbowHandler);
    rainbowButton.style.backgroundColor = inactiveButton;
    eraseButton.removeEventListener('click', eraseHandler);
    eraseButton.style.backgroundColor = inactiveButton;

    //removes all the old rows and columns and creates new ones
    cols.forEach(col => col.remove());
    rows.forEach(row => row.remove());

    createGrid(newGridSize); 
}