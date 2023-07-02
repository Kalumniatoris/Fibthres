
const grid = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
const GRID_SIZE = 5;

function fibonacci(n) {
    const sequence = [1, 2];
    for (let i = 2; i < n; i++) {
      sequence[i] = sequence[i - 1] + sequence[i - 2];
    }
    return sequence;
  }
  

  function generateDistinctColors(n) {
    const colors = [];
    const hueIncrement = 360 / n;
    let hue = 0;
  
    for (let i = 0; i < n; i++) {
      colors.push(`hsl(${hue}, 100%, 50%)`);
      hue = (hue + hueIncrement) % 360;
    }
  
    return colors;
  }
  

  const values = fibonacci(20); 
  const styleElement = document.createElement('style');
  
  const colors = generateDistinctColors(values.length);
  
  for (let i = 0; i < values.length; i++) {
    const className = `.value-${values[i]}`;
    const backgroundColor = colors[i];
    const cssRule = `${className} {
      background-color: ${backgroundColor};
    }`;
    styleElement.appendChild(document.createTextNode(cssRule));
  }
  
  document.head.appendChild(styleElement);

  ////////////////////////////

function displayGrid() {
    const gridContainer = document.getElementById('grid');
    gridContainer.innerHTML = '';
  
    const cells = Array.from(gridContainer.getElementsByClassName('cell'));
    cells.forEach(cell => cell.classList.remove('move-animation'));
  
    grid.forEach(row => {
      row.forEach(cellValue => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = cellValue !== 0 ? cellValue : '';
        cell.classList.add(`value-${cellValue}`); 
        gridContainer.appendChild(cell);
      });
    });
  
    const highestNumber = Math.max(...grid.flat());
    document.getElementById('top').textContent = highestNumber !== -Infinity ? highestNumber : '';
    const sum = grid.flat().reduce((acc, curr) => acc + curr, 0);
    document.getElementById('sum').textContent = sum;
  }


addRandomNumber();
addRandomNumber();

function addRandomNumber() {
    const emptyCells = [];
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (grid[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }

    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.row][randomCell.col] = Math.random() < 0.8 ? 1 : 2;
    }

    displayGrid();
}

function moveNumbers(direction) {
    const gridCopy = JSON.parse(JSON.stringify(grid)); 
    let moved = false; 

    if (direction === "up") {
        for (let col = 0; col < GRID_SIZE; col++) {
            for (let row = 1; row < GRID_SIZE; row++) {
                if (grid[row][col] !== 0) {
                    let newRow = row;
                    while (newRow > 0 && (grid[newRow - 1][col] === 0 || isFibonacci(grid[newRow - 1][col], grid[newRow][col]))) {
                        if (grid[newRow - 1][col] === 0) {
                            grid[newRow - 1][col] = grid[newRow][col];
                            grid[newRow][col] = 0;
                            newRow--;
                            moved = true;
                        } else if (isFibonacci(grid[newRow - 1][col], grid[newRow][col])) {
                            grid[newRow - 1][col] += grid[newRow][col];
                            grid[newRow][col] = 0;
                            moved = true;
                            break;
                        }
                    }
                }
            }
        }
    } else if (direction === "down") {
        for (let col = 0; col < GRID_SIZE; col++) {
            for (let row = GRID_SIZE - 2; row >= 0; row--) {
                if (grid[row][col] !== 0) {
                    let newRow = row;
                    while (newRow < GRID_SIZE - 1 && (grid[newRow + 1][col] === 0 || isFibonacci(grid[newRow + 1][col], grid[newRow][col]))) {
                        if (grid[newRow + 1][col] === 0) {
                            grid[newRow + 1][col] = grid[newRow][col];
                            grid[newRow][col] = 0;
                            newRow++;
                            moved = true;
                        } else if (isFibonacci(grid[newRow + 1][col], grid[newRow][col])) {
                            grid[newRow + 1][col] += grid[newRow][col];
                            grid[newRow][col] = 0;
                            moved = true;
                            break;
                        }
                    }
                }
            }
        }


    } else if (direction === "left") {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 1; col < GRID_SIZE; col++) {
                if (grid[row][col] !== 0) {
                    let newCol = col;
                    while (newCol > 0 && (grid[row][newCol - 1] === 0 || isFibonacci(grid[row][newCol - 1], grid[row][newCol]))) {
                        if (grid[row][newCol - 1] === 0) {
                            grid[row][newCol - 1] = grid[row][newCol];
                            grid[row][newCol] = 0;
                            newCol--;
                            moved = true;
                        } else if (isFibonacci(grid[row][newCol - 1], grid[row][newCol])) {
                            grid[row][newCol - 1] += grid[row][newCol];
                            grid[row][newCol] = 0;
                            moved = true;
                            break;
                        }
                    }
                }
            }
        }
    }
    else if (direction === "right") {
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = GRID_SIZE - 2; col >= 0; col--) {
                if (grid[row][col] !== 0) {
                    let newCol = col;
                    while (newCol < GRID_SIZE - 1 && (grid[row][newCol + 1] === 0 || isFibonacci(grid[row][newCol + 1], grid[row][newCol]))) {
                        if (grid[row][newCol + 1] === 0) {
                            grid[row][newCol + 1] = grid[row][newCol];
                            grid[row][newCol] = 0;
                            newCol++;
                            moved = true;
                        } else if (isFibonacci(grid[row][newCol + 1], grid[row][newCol])) {
                            grid[row][newCol + 1] += grid[row][newCol];
                            grid[row][newCol] = 0;
                            moved = true;
                            break;
                        }
                    }
                }
            }
        }
    }

    if (moved) {
        displayGrid();
        addRandomNumber();
    }
}


function handleUserInput(event) {

    if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
        moveNumbers(event.key.slice(5).toLowerCase());
    }
    //console.log(event);
}


let touchStartX, touchStartY;

function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (!touchStartX || !touchStartY) {
        return;
    }

    const touchEndX = event.touches[0].clientX;
    const touchEndY = event.touches[0].clientY;

    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    console.log(deltaX,deltaY);
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0) {
            moveNumbers("right");
        } else {
            moveNumbers("left");
        }
    } else {
        if (deltaY > 0) {
            moveNumbers("down");
        } else {
            moveNumbers("up");
        }
    }

    touchStartX = null;
    touchStartY = null;
}

document.addEventListener('keydown', handleUserInput);
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
displayGrid();


function isFibonacci(a, b) {
    let c = a + b;
    let fibNumbers = [0, 1];
    while (fibNumbers[fibNumbers.length - 1] < c) {
        let nextNumber = fibNumbers[fibNumbers.length - 1] + fibNumbers[fibNumbers.length - 2];
        fibNumbers.push(nextNumber);
    }
    return fibNumbers.includes(c);
}


function displayPairs() {
    const pairsContainer = document.getElementById('pairs');
    pairsContainer.innerHTML = '';
  
    foundPairs.forEach(pair => {
      const pairElement = document.createElement('div');
      pairElement.textContent = pair;
      pairsContainer.appendChild(pairElement);
    });
  }