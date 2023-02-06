function createGrid() {
    const gridContainer = document.querySelector('.grid');
    const gridSize = prompt("enter grid size");
    for(let i = 0; i < gridSize; i++){
        const gridRow = document.createElement('div');
        gridRow.style.cssText = 'display: flex; flex: 1';
        for(let j = 0; j < gridSize; j++) {
            const gridCol = document.createElement('div');
            gridCol.style.cssText = 'display: flex; flex: 1; background-color: salmon; text-align: center; margin: 1px';
            gridRow.appendChild(gridCol);
            gridContainer.appendChild(gridRow);
    }
}
}


createGrid();