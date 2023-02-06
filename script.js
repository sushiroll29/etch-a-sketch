
function createGrid() {
    const gridContainer = document.querySelector('.grid');
    // const gridSize = prompt("enter grid size");
    for(let i = 0; i < 40; i++){
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        for(let j = 0; j < 40; j++) {
            const gridCol = document.createElement('div');
            gridCol.classList.add('grid-col');
            gridRow.appendChild(gridCol);
            
    }
    gridContainer.appendChild(gridRow);
    }
}

function draw(){
    const squares = document.querySelectorAll('.grid-col');
    squares.forEach(square => square.addEventListener('mousemove', (e) => {
            if(e.buttons == 1) { //checks if the mouse button is down
                square.style.cssText = 'background-color: black';
            }
    }));
}

function clear(){
    const squares = document.querySelectorAll('.grid-col');
    const clearButton = document.querySelector(".clear");
    clearButton.addEventListener('click', () => {
        squares.forEach(square => square.style.cssText = 'background-color: white');
    });
}

function erase(){
    const squares = document.querySelectorAll('.grid-col');
    const eraseButton = document.querySelector('.eraser');
    eraseButton.addEventListener('click', () => { 
        eraseButton.classList.toggle('.erase');
        if(eraseButton.classList.contains('.erase')) {
            eraseButton.style.backgroundColor = '#DEDEDE';
            squares.forEach(square => square.addEventListener('mousemove', (e) => {
            if(e.buttons == 1) { //checks if the mouse button is down
                square.style.cssText = 'background-color: white';
                }
        }));
        } else {
            eraseButton.style.backgroundColor = 'white';
            draw();

        }
    });
}

function rainbow(){
    const squares = document.querySelectorAll('.grid-col');
    const rainbowButton = document.querySelector('.rainbow');
    rainbowButton.addEventListener('click', () => {
        rainbowButton.classList.toggle('.color');
        if(rainbowButton.classList.contains('.color')) {
            rainbowButton.style.backgroundColor = '#DEDEDE';
            squares.forEach(square => square.addEventListener('mousemove', (e) => {
                if(e.buttons == 1) { //checks if the mouse button is down
                    const randomColor = Math.floor(Math.random()*16777215).toString(16);
                    square.style.backgroundColor = '#' + randomColor;
                    }
            }));
            } else {
                rainbowButton.style.backgroundColor = 'white';
                draw();
    
            }
        }
    );
}


createGrid();
draw();
clear();
erase();
rainbow();