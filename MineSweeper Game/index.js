const grid = document.querySelector('#grid');

let lockGame = false;
const testMode = true;
generateGrid();

function generateGrid() {
  lockGame = false;

  grid.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    let row = grid.insertRow(i);
    for (let j = 0; j < 10; j++) {
      let cell = row.insertCell(j);
      cell.addEventListener('click', function () {
        init(this);
      });

      let mine = document.createAttribute('mine');
      mine.value = 'false';
      cell.setAttributeNode(mine);
    }
  }

  generateMines();
}

function generateMines() {
  for (let i = 0; i < 20; i++) {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    let cell = grid.rows[row].cells[col];
    cell.setAttribute('mine', 'true');
    if (testMode) cell.innerHTML = 'X';
  }
}

function revealMines() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = grid.rows[i].cells[j];
      if (cell.getAttribute('mine') === 'true') cell.classList.add('mine');
    }
  }
}

function checkGameComplete() {
  let gameComplete = true;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (grid.rows[i].cells[j].getAttribute('mine') === 'false' && grid.rows[i].cells[j].innerHTML === '') {
        gameComplete = false;
      }
    }
  }

  if (gameComplete) {
    alert('You Found All Mines! Game Over!');
    revealMines();
  }
}

function init(cell) {
  if (lockGame) {
    return;
  } else {
    // Check if user clicked on mine
    if (cell.getAttribute('mine') == 'true') {
      revealMines();
      lockGame = true;
    } else {
      cell.className = 'active';
      let mineCount = 0;
      let cellRow = cell.parentNode.rowIndex;
      let cellCol = cell.cellIndex;

      // Check surrounding cells
      for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
        for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
          if (grid.rows[i].cells[j].getAttribute('mine') === 'true') mineCount++;
        }
      }
      
      cell.innerHTML = mineCount;

      if (mineCount === 0) {
        for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, 9); i++) {
          for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, 9); j++) {
            if (grid.rows[i].cells[j].innerHTML === '') init(grid.rows[i].cells[j]);
          }
        }
      }
      checkGameComplete();
    }
  }
}
