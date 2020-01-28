let gameArray = [];
for(var i=0; i<7; i++) {
  gameArray[i] = document.getElementsByClassName("column-" + i);
}
console.log(gameArray);

let currentPlayer;
let currentPieceX;
let currentPieceY;

let directionsArray = [checkNE, checkE, checkSE, checkS, checkSW, checkW, checkNW];

// The win checks for every direction around the current piece that was added

function checkNE() {
  for (let i = 1; i < 4, i++) {
    let currentPiece = gameArray[currentPieceX + i][currentPieceY + i];
    if (currentPiece === undefined) {
      break;
    } else if (currentPiece.style.color !== player.color) {
      break;
    }
  }
  return i === 4;
}

function checkE() {
  for (let i = 1; i < 4, i++) {
    let currentPiece = gameArray[currentPieceX + i][currentPieceY];
    if (currentPiece === undefined) {
      break;
    } else if (currentPiece.style.color !== player.color) {
      break;
    }
  }
  return i === 4;
}

function checkS() {
  for (let i = 1; i < 4, i++) {
    let currentPiece = gameArray[currentPieceX][currentPieceY - i];
    if (currentPiece === undefined) {
      break;
    } else if (currentPiece.style.color !== player.color) {
      break;
    }
  }
  return i === 4;
}

function checkSW() {
  for (let i = 1; i < 4, i++) {
    let currentPiece = gameArray[currentPieceX - i][currentPieceY - i];
    if (currentPiece === undefined) {
      break;
    } else if (currentPiece.style.color !== player.color) {
      break;
    }
  }
  return i === 4;
}

function checkW() {
  for (let i = 1; i < 4, i++) {
    let currentPiece = gameArray[currentPieceX - i][currentPieceY];
    if (currentPiece === undefined) {
      break;
    } else if (currentPiece.style.color !== player.color) {
      break;
    }
  }
  return i === 4;
}

function checkNW() {
  for (let i = 1; i < 4, i++) {
    let currentPiece = gameArray[currentPieceX - i][currentPieceY + i];
    if (currentPiece === undefined) {
      break;
    } else if (currentPiece.style.color !== player.color) {
      break;
    }
  }
  return i === 4;
}

// Function that runs all the checks in each direction and returns true at the first instance of a winning case
function checkWin(){
  for (let i = 0; i < directionsArray.length; i++) {
    if (directionsArray[i]()) {
      return true; // And call an end game function?
      // endGame();
    }
  }
}

// If checkWin evaluates to true, do the endGame functionality
if (checkWin) {
  endGame();
}
