// Variable declarations ______________________________________________________
let gameColumns = [];
for(let i=0; i<7; i++) {
  gameColumns[i] = document.getElementsByClassName("column-" + i); //create array of columns of elements
  for(let k=0; k<gameColumns[i].length; k++) {
    gameColumns[i][k].setAttribute("id", i +"-"+ k);
    gameColumns[i][k].setAttribute("column", i);
    gameColumns[i][k].setAttribute("row", k);
    gameColumns[i][k].setAttribute("color", "blank");  //create IDs dynamically
  }
}

console.log("gameColumns Array: ",gameColumns);

let currentPieceX;
let currentPieceY;

let firstPlayer = {
  color: "red"
};
let secondPlayer = {
  color: "blue"
};
let currentPlayer = firstPlayer;

let topRowEls = document.getElementsByClassName("row-5"); // create list of top row of elements
for(i=0; i<topRowEls.length; i++) {
  topRowEls[i].addEventListener("click", dropPiece); //add a listener to each slot in the top row
}

// End variable declarations ______________________________________________________

// Drop piece functionality ______________________________________________________

function dropPiece() {
  let clickedEl = event.target;
  let columnToDropIn = gameColumns[clickedEl.getAttribute("column")];
  for(let i=0; i<columnToDropIn.length; i++) {
    if(columnToDropIn[i].getAttribute("color") === "blank") {
      columnToDropIn[i].classList.add(currentPlayer.color);
      console.log("Current player dropped a token:", currentPlayer.color);
      break;
    }
  }
}

// End drop piece functionality ______________________________________________________

// Check for win functionality _______________________________________________________

let directionsArray = [checkNE, checkE, checkSE, checkS, checkSW, checkW, checkNW];

// The win checks for every direction around the current piece that was added

function checkNE() {
  let i;
  for (i = 1; i < 4, i++) {
    let currentPiece = gameColumns[currentPieceX + i][currentPieceY + i];
    if (currentPiece === undefined) {
      break;
    } else if (currentPiece.style.color !== currentPlayer.color) {
      break;
    }
  }
  return i === 4;
}

function checkE() {
  let i;
  for (i = 1; i < 4, i++) {
    let currentPiece = gameColumns[currentPieceX + i][currentPieceY];
    if (currentPiece === undefined) {
      break;
    } else if (currentPiece.style.color !== currentPlayer.color) {
      break;
    }
  }
  return i === 4;
}

function checkS() {
  let i;
  for (i = 1; i < 4, i++) {
    let currentPiece = gameColumns[currentPieceX][currentPieceY - i];
    if (currentPiece === undefined) {
      break;
    } else if (currentPiece.style.color !== currentPlayer.color) {
      break;
    }
  }
  return i === 4;
}

function checkSW() {
  let i;
  for (i = 1; i < 4, i++) {
    let currentPiece = gameColumns[currentPieceX - i][currentPieceY - i];
    if (currentPiece === undefined) {
      break;
    } else if (currentPiece.style.color !== currentPlayer.color) {
      break;
    }
  }
  return i === 4;
}

function checkW() {
  let i;
  for (i = 1; i < 4, i++) {
    let currentPiece = gameColumns[currentPieceX - i][currentPieceY];
    if (currentPiece === undefined) {
      break;
    } else if (currentPiece.style.color !== currentPlayer.color) {
      break;
    }
  }
  return i === 4;
}

function checkNW() {
  let i;
  for (i = 1; i < 4, i++) {
    let currentPiece = gameColumns[currentPieceX - i][currentPieceY + i];
    if (currentPiece === undefined) {
      break;
    } else if (currentPiece.style.color !== currentPlayer.color) {
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