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
