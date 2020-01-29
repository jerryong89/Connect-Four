// Variable declarations ______________________________________________________
let configModalEl = document.getElementById("config-modal");
let numRows = 6; //default
let numColumns = 7; //default
let roundTimeoutSecs = null; //default (no limit)
document.getElementById("classic-btn").addEventListener("click", setUpGame);
document.getElementById("custom-btn").addEventListener("click", setUpGame);

let gameColumns = [];

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
document.getElementById("player-one-box").classList.add("column-glow");
document.getElementById("reset-btn").addEventListener("click", resetBoard);



// End variable declarations ______________________________________________________


// Set Up Game functionality ______________________________________________________
function setUpGame() {
  if(event.target.getAttribute("id") === "custom-btn"){
    numRows = document.getElementById("rows-input").value;
    numColumns = document.getElementById("columns-input").value;
  }
  roundTimeoutSecs = document.getElementById("time-input");
  let gameContainerEl = document.getElementById("game-container");
  while(gameContainerEl.firstChild) {
    gameContainerEl.removeChild(gameContainerEl.firstChild);
  }
  let columnToAppend;
  let slotToAppend;
  for(let i=0; i < numColumns; i++) {
    columnToAppend = document.createElement("section");
    columnToAppend.setAttribute("id","column-" + i);
    for(let k=0; k < numRows; k++) {
      slotToAppend = document.createElement("div");
      slotToAppend.className += "column-" +i+ " row-" +k+ " white";
      columnToAppend.appendChild(slotToAppend);
    }
    gameContainerEl.appendChild(columnToAppend);
  }

  for (let i = 0; i < document.querySelectorAll("#game-container > section").length; i++) {
    gameColumns[i] = document.getElementsByClassName("column-" + i); //create array of columns of elements
    for (let k = 0; k < gameColumns[i].length; k++) {
      gameColumns[i][k].setAttribute("id", i + "-" + k);
      gameColumns[i][k].setAttribute("column", i);
      gameColumns[i][k].setAttribute("row", k);
    }
    /* gameColumns[i].addEventListener("click", dropPiece);
    gameColumns[i].addEventListener("mouseenter", mouseenterColumn);
    gameColumns[i].addEventListener("mouseleave", mouseleaveColumn); */
  }

  let columnToClick;
  for(let i=0; i<gameColumns.length; i++){
    columnToClick = document.getElementById("column-" + i);
    columnToClick.addEventListener("click", dropPiece);
    columnToClick.addEventListener("mouseenter", mouseenterColumn);
    columnToClick.addEventListener("mouseleave", mouseleaveColumn);
    columnToClick.setAttribute("column", i);
  }

  console.log("gameColumns Array: ", gameColumns);
  configModalEl.classList.add("hidden");
}
//End Set Up Game functionality

// Select column styling ______________________________________________________
function mouseenterColumn(event) {
  event.target.classList.add("column-glow");
}
function mouseleaveColumn(event) {
  event.target.classList.remove("column-glow");
}
// End select column styling ______________________________________________________



// Drop piece functionality ______________________________________________________

function dropPiece() {
  let clickedEl = event.target;
  let columnToDropIn = gameColumns[clickedEl.getAttribute("column")];
  let gameBoardFull = false;
  if(columnToDropIn[numRows - 1].classList[2] !== "white") { // check if column is full
    return;
  }
  for(let i=0; i<columnToDropIn.length; i++) { //look for white spaces to drop token
    if(columnToDropIn[i].classList[2] === "white") {
      columnToDropIn[i].classList.remove("white");
      columnToDropIn[i].classList.add(currentPlayer.color);
      currentPieceX = parseInt(columnToDropIn[i].getAttribute("column") , 10);
      currentPieceY = parseInt(columnToDropIn[i].getAttribute("row"), 10);
      console.log(currentPlayer.name, "dropped a" , currentPlayer.color, "token at", currentPieceX, currentPieceY);
      if (currentPieceY === numRows - 1){
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
      document.getElementById("player-two-box").classList.add("column-glow");
      document.getElementById("player-one-box").classList.remove("column-glow");
    } else {
      currentPlayer = firstPlayer;
      document.getElementById("player-two-box").classList.remove("column-glow");
      document.getElementById("player-one-box").classList.add("column-glow");
    }
  } else {
    console.log(`${currentPlayer.name} WINS!`);
    endGame(true);
  }

  //incomplete
  /* if(roundTimeoutSecs !== null) { //if player has set a timer
    setTimeout(function(){
              if (currentPlayer === firstPlayer) {
                currentPlayer = secondPlayer;
              } else {
                currentPlayer = firstPlayer;
              } }, roundTimeoutSecs * 1000)
  }*/
}

// End drop piece functionality ______________________________________________________

// Check for win functionality _______________________________________________________

let directionsArray = [checkNE, checkE, checkSE, checkS, checkSW, checkW, checkNW];

// The win checks for every direction around the current piece that was added

function checkNE() {
  let i;
  for (i = 1; i < 4; i++) {
    if (currentPieceX + i < 0 || currentPieceX + i > numColumns - 1 || currentPieceY + i < 0 || currentPieceY + i > numRows - 1) {
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
    if (currentPieceX + i < 0 || currentPieceX + i > numColumns - 1) {
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
    if (currentPieceX + i < 0 || currentPieceX + i > numColumns - 1 || currentPieceY - i < 0 || currentPieceY - i > numRows - 1) {
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
    if (currentPieceY - i < 0 || currentPieceY - i > numRows - 1) {
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
    if (currentPieceX - i < 0 || currentPieceX - i > numColumns - 1 || currentPieceY - i < 0 || currentPieceY - i > numRows - 1) {
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
    if (currentPieceX - i < 0 || currentPieceX - i > numColumns - 1) {
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
    if (currentPieceX - i < 0 || currentPieceX - i > numColumns - 1 || currentPieceY + i < 0 || currentPieceY + i > numRows - 1) {
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
  for (let i = 0; i < gameColumns[0].length; i++) {
    if (gameColumns[i][numRows - 1].classList[2] === "white") { //if one top row element is white, game is not full yet
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
  setTimeout(function(){ winModal.classList.remove("hidden") }, 2000); //let player view winning board before displaying win modal
}

//wipes classes from gamepiece slots
function resetBoard() {
  for (var tiles = 0; tiles < gameColumns.length; tiles++) {
    for (var inside = 0; inside < gameColumns[tiles].length; inside++) {
      gameColumns[tiles][inside].classList.remove("red");
      gameColumns[tiles][inside].classList.remove("black");
      gameColumns[tiles][inside].classList.add("white");
    }
  }
  gameColumns = [];
  currentPlayer = firstPlayer;
  numRows = 6;
  numColumns = 7;
  configModalEl.classList.remove("hidden");
  document.getElementById("win-modal").classList.add("hidden");
}
