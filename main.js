// Variable declarations ______________________________________________________
let gameColumns = [];
for(let i=0; i<7; i++) {
  gameColumns[i] = document.getElementsByClassName("column-" + i); //create array of columns of elements
  for(let k=0; k<gameColumns[i].length; k++) {
    gameColumns[i][k].setAttribute("id", i +"-"+ k);
    gameColumns[i][k].setAttribute("column", i);
    gameColumns[i][k].setAttribute("row", k);
  }
}

console.log("gameColumns Array: ",gameColumns);

let currentPieceX;
let currentPieceY;

let firstPlayer = {
  name: "Player 1",
  color: "red"
};
let secondPlayer = {
  name: "Player 2",
  color: "black"
};
let currentPlayer = firstPlayer;

let topRowEls = document.getElementsByClassName("row-5"); // create list of top row of elements
for(i=0; i<topRowEls.length; i++) {
  topRowEls[i].addEventListener("click", dropPiece); //add a listener to each slot in the top row
  topRowEls[i].addEventListener("mouseenter", mouseenterColumn); //adds column selector glow
  topRowEls[i].addEventListener("mouseleave", mouseleaveColumn); //removes column selector glow
}
document.getElementById("reset-btn").addEventListener("click", resetBoard);



// End variable declarations ______________________________________________________

// Select column styling ______________________________________________________
function mouseenterColumn(event) {
  event.target.parentElement.classList.add("column-glow");
}
function mouseleaveColumn(event) {
  event.target.parentElement.classList.remove("column-glow");
}
// End select column styling ______________________________________________________


// Drop piece functionality ______________________________________________________

function dropPiece() {
  let clickedEl = event.target;
  let columnToDropIn = gameColumns[clickedEl.getAttribute("column")];
  let gameBoardFull = false;
  if(columnToDropIn[5].classList[2] !== "white") { // check if column is full
    return;
  }
  for(let i=0; i<columnToDropIn.length; i++) { //look for white spaces to drop token
    if(columnToDropIn[i].classList[2] === "white") {
      columnToDropIn[i].classList.remove("white");
      columnToDropIn[i].classList.add(currentPlayer.color);
      currentPieceX = parseInt(columnToDropIn[i].getAttribute("column") , 10);
      currentPieceY = parseInt(columnToDropIn[i].getAttribute("row"), 10);
      console.log(currentPlayer.name, "dropped a" , currentPlayer.color, "token at", currentPieceX, currentPieceY);
      if (currentPieceY === 5){
        gameBoardFull = isBoardFull();
        console.log("gameBoardFull:", gameBoardFull);
      }
      break; //stop looking for places to drop token
    }
  }
  if(!checkWin()){
    console.log("Win check returned false");
    if(gameBoardFull) {
      endGame(false);
    } else if (currentPlayer === firstPlayer) {
      currentPlayer = secondPlayer;
    } else {
      currentPlayer = firstPlayer;
    }
  } else {
    console.log(`${currentPlayer.name} WINS!`);
    endGame(true);
  }
}

// End drop piece functionality ______________________________________________________

// Check for win functionality _______________________________________________________

let directionsArray = [checkNE, checkE, checkSE, checkS, checkSW, checkW, checkNW];

// The win checks for every direction around the current piece that was added

function checkNE() {
  let i;
  for (i = 1; i < 4; i++) {
    if (currentPieceX + i < 0 || currentPieceX + i > 6 || currentPieceY + i < 0 || currentPieceY + i > 5) {
      break;
    }
    let currentPiece = gameColumns[currentPieceX + i][currentPieceY + i]; // ***Need to make sure we do not refer to an invalid array index***
    if (currentPiece.classList[2] !== currentPlayer.color) {
      break;
    }
  }
  return i - 1;
}

function checkE() {
  let i;
  for (i = 1; i < 4; i++) {
    if (currentPieceX + i < 0 || currentPieceX + i > 6) {
      break;
    }
    let currentPiece = gameColumns[currentPieceX + i][currentPieceY];
    if (currentPiece.classList[2] !== currentPlayer.color) {
      break;
    }
  }
  return i - 1;
}

function checkSE() {
  let i;
  for (i = 1; i < 4; i++) {
    if (currentPieceX + i < 0 || currentPieceX + i > 6 || currentPieceY - i < 0 || currentPieceY - i > 5) {
      break;
    }
    let currentPiece = gameColumns[currentPieceX + i][currentPieceY - i];
    if (currentPiece.classList[2] !== currentPlayer.color) {
      break;
    }
  }
  return i - 1;
}

function checkS() {
  let i;
  for (i = 1; i < 4; i++) {
    if (currentPieceY - i < 0 || currentPieceY - i > 5) {
      break;
    }
    let currentPiece = gameColumns[currentPieceX][currentPieceY - i];
    if (currentPiece.classList[2] !== currentPlayer.color) {
      break;
    }
  }
  return i - 1;
}

function checkSW() {
  let i;
  for (i = 1; i < 4; i++) {
    if (currentPieceX - i < 0 || currentPieceX - i > 6 || currentPieceY - i < 0 || currentPieceY - i > 5) {
      break;
    }
    let currentPiece = gameColumns[currentPieceX - i][currentPieceY - i];
    if (currentPiece.classList[2] !== currentPlayer.color) {
      break;
    }
  }
  return i - 1;
}

function checkW() {
  let i;
  for (i = 1; i < 4; i++) {
    if (currentPieceX - i < 0 || currentPieceX - i > 6) {
      break;
    }
    let currentPiece = gameColumns[currentPieceX - i][currentPieceY];
    if (currentPiece.classList[2] !== currentPlayer.color) {
      break;
    }
  }
  return i - 1;
}

function checkNW() {
  let i;
  for (i = 1; i < 4; i++) {
    if (currentPieceX - i < 0 || currentPieceX - i > 6 || currentPieceY + i < 0 || currentPieceY + i > 5) {
      break;
    }
    let currentPiece = gameColumns[currentPieceX - i][currentPieceY + i];
    if (currentPiece === undefined) {
      break;
    } else if (currentPiece.classList[2] !== currentPlayer.color) {
      break;
    }
  }
  return i - 1;
}

// Function that runs all the checks in each direction and returns true at the first instance of a winning case
function checkWin() {
  if (checkS() + 1 >= 4 || checkNW() + checkSE() + 1 >=4 || checkNE() + checkSW() + 1 >= 4 || checkW() + checkE() + 1 >= 4) {
    console.log("You got it");
    return true;
  }
}

function isBoardFull() {
  for (let i = 0; i < topRowEls.length; i++) {
    if (topRowEls[i].classList[2] === "white") { //if one top row element is white, game is not full yet
      return false;
    }
  }
  return true;
}

//displays win modal and modifies the text based upon whether the win condition was met
function endGame(winCondition) {
  let winModal = document.getElementById("win-modal");
  let modalMessage = document.getElementById("message");
  modalMessage.setAttribute('style', 'white-space: pre;'); //allows use of carriage return \r\n
  if(winCondition) {
    modalMessage.innerText = "Woofa woof!" +"\r\n"+ currentPlayer.name + " wins!";
  } else {
    modalMessage.innerText = "Bork!" +"\r\n"+ "You tied!";
  }
  winModal.classList.remove("hidden");
}

function resetBoard() {
  for (var tiles = 0; tiles < gameColumns.length; tiles++) {
    for (var inside = 0; inside < gameColumns[tiles].length; inside++) {
      gameColumns[tiles][inside].classList.remove("red");
      gameColumns[tiles][inside].classList.remove("black");
      gameColumns[tiles][inside].classList.add("white");
    }
  }
  currentPlayer = firstPlayer;
  document.getElementById("win-modal").classList.add("hidden");
}
