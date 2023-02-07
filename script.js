let gridSize;
const eraseButton = document.querySelector('.eraser');
const rainbowButton = document.querySelector('.rainbow');
const clearButton = document.querySelector(".clear");
const gridContainer = document.querySelector('.grid');
const colorPicker = document.querySelector('.color-picker');
const defaultColor = 'black';

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

//disables or enables all buttons except for the parameter button
function toggleButtonDisable(exceptionButton, isDisabled){
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if(button.textContent !== exceptionButton.textContent){
            button.disabled = isDisabled;
        }
    })
    colorPicker.disabled = isDisabled ? true : false;
    colorPicker.value = isDisabled ? '#cccccc' : defaultColor;
}

//returns random pastel-ish color
function getColor(){ 
    return "hsl(" + 360 * Math.random() + ',' +
               (45 + 50 * Math.random()) + '%,' + 
               (75 + 10 * Math.random()) + '%)'
}

//function calls
createGrid(30);
changeSize();

//handlers
function eraseHandler(){
    eraseButton.classList.toggle('.erase');
    colorPicker.value = defaultColor;

    if(eraseButton.classList.contains('.erase')) {
        toggleButtonDisable(eraseButton, true);
        colorPicker.disabled = true;
        setSquareColor('white');
    } else {
        toggleButtonDisable(eraseButton, false);
        draw();
    }
}

function rainbowHandler() {
    const squares = document.querySelectorAll('.grid-col');

    rainbowButton.classList.toggle('color');
    colorPicker.value = defaultColor;

    if(rainbowButton.classList.contains('color')) {
        toggleButtonDisable(rainbowButton, true);
        squares.forEach(square => square.addEventListener('mousemove', (e) => {
            if(e.buttons == 1) { //checks if the mouse button is down
                square.style.backgroundColor = getColor();
                }
            }));
    } else {
        toggleButtonDisable(rainbowButton, false);
        draw();
        }
}

function changeSizeHandler(){
    let cols = document.querySelectorAll('.grid-col');
    let rows = document.querySelectorAll('.grid-row');
    let newGridSize = prompt("What size do you want the new grid to be? (max. 100)");
    if(newGridSize < 1 || newGridSize > 100 || !Number(newGridSize)) {
        alert("Please enter a number between 1 and 100.");
        return;
    }
    if(newGridSize === null) return; //stops grid from disappearing if selecting 'cancel'

    colorPicker.value = defaultColor;

    rainbowButton.removeEventListener('click', rainbowHandler);
    eraseButton.removeEventListener('click', eraseHandler);

    //removes all the old rows and columns and creates new ones
    cols.forEach(col => col.remove());
    rows.forEach(row => row.remove());

    createGrid(newGridSize); 
}