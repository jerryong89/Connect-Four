let gameArray = [];
for(var i=0; i<7; i++) {
  gameArray[i] = document.getElementsByClassName("column-" + i);
}
console.log(gameArray);

let currentPlayer;
let currentPieceX;
let currentPieceY;
