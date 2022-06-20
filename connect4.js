/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = board =
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
 (HEIGHT, WIDTH) => [...Array(HEIGHT).keys()].map(i => Array(WIDTH))


/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board")
    // TODO: add comment for this code
  // create rows
  const top = document.createElement("tr");
  // assign id
  top.setAttribute("id", "column-top");
  // click event handler
  top.addEventListener("click", handleClick);

  // creating and appending cells to column tops
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // creating rows and table data cells 
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for(let y = HEIGHT -1; y < HEIGHT; y++){
    if(!board[y][x]){
      return y;
    }
    else{
      return null;
    }
  }

}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let piece = document.createElement('div');
  piece.setAttribute('class', 'piece');
  piece.setAttribute('class', `${currPlayer}`)
    let location = document.getElementById(`${y}-${x}`)
  location.append(piece)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  console.alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {

    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
function checkForTie() {
    function _tie(cells){
      for(let x = 0; x < WIDTH; x++) {
        for (let y = 0; y < HEIGHT; y++){
          if(cells.every()){
            return endGame('Its a tie!')
          }
        }
      }
    }
}
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  function swapPlayer() {
    if (currPlayer = 1) {
      currPlayer += 1 ;
  }
  else{ 
    currPlayer -= 1
  }
}
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
// loops over each cell
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // selecting the four ways to match pieces that would necessitate a win
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // checking if one of the conditions is met to win
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        // if any are met a win is called
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
