checkNE
checkE
checkSE
checkS
checkSW
checkW
checkNW

let directionsArray = [];
for (let i = 1; i <= 4, i++) {
  if (array[currentX + i][currentY + i] !== sameColor) {
    break;
  }
  if (i === 4) {
    hasWon = true;
  }
}
