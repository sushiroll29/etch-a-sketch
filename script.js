const squares = document.querySelectorAll('.grid-col');

function createGrid() {
    const gridContainer = document.querySelector('.grid');
    // const gridSize = prompt("enter grid size");
    for(let i = 0; i < 23; i++){
        const gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        for(let j = 0; j < 23; j++) {
            const gridCol = document.createElement('div');
            gridCol.classList.add('grid-col');
            gridRow.appendChild(gridCol);
            
    }
    gridContainer.appendChild(gridRow);
    }
}

function draw(){
    squares.forEach(square => square.addEventListener('mousemove', (e) => {
            if(e.buttons == 1) { //if the mouse button is down
                square.style.cssText = 'background-color: black';
            }
    }));
}

function clear(){
    squares.forEach(square => square.style.cssText = 'background-color: white');
}


createGrid();
draw();