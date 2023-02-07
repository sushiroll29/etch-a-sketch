let gridSize;
const eraseButton = document.querySelector('.eraser');
const rainbowButton = document.querySelector('.rainbow');
const clearButton = document.querySelector(".clear");
const gridContainer = document.querySelector('.grid');

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
clear();
erase();
rainbow();
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
    setSquareColor('black');
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
        if(eraseButton.classList.contains('.erase')) {
            rainbowButton.disabled = true;
            eraseButton.style.backgroundColor = '#DEDEDE';
            setSquareColor('white');
        } else {
            eraseButton.style.backgroundColor = 'white';
            rainbowButton.disabled = false;
            draw();
        }
}

function rainbowHandler() {
    const squares = document.querySelectorAll('.grid-col');
    rainbowButton.classList.toggle('.color');
        if(rainbowButton.classList.contains('.color')) {
            eraseButton.disabled = true;
            rainbowButton.style.backgroundColor = '#DEDEDE';
            squares.forEach(square => square.addEventListener('mousemove', (e) => {
                if(e.buttons == 1) { //checks if the mouse button is down
                    const randomColor = Math.floor(Math.random()*16777215).toString(16);
                    square.style.backgroundColor = '#' + randomColor;
                    }
            }));
        } else {
            rainbowButton.style.backgroundColor = 'white';
            eraseButton.disabled = false;
            draw();
        }
}

function changeSizeHandler(){
    let size = prompt("What size do you want the grid to be? (max. 100)");
    let cols = document.querySelectorAll('.grid-col');
    let rows = document.querySelectorAll('.grid-row');
    
    rainbowButton.removeEventListener('click', rainbowHandler);
    eraseButton.removeEventListener('click', eraseHandler);

    cols.forEach(col => col.remove());
    rows.forEach(row => row.remove());

    createGrid(size); 
}