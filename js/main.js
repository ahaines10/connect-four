/*----- constants -----*/
const PLAYERS_COLORS = {
  1: "green",
  "-1": "blue",
  0: "white",
};
/*----- app's state (variables) -----*/
let board;
let winner = null; // null = game in play    1/-1 has won 'T'
let turn = 1; //  1/-1
let gameStatus;

/*----- cached element references -----*/
const boardEl = document.getElementById("board");
const buttonEls = document.getElementById("markers");
/*----- event listeners -----*/
// boardEl.addEventListener("click", handleMove);
buttonEls.addEventListener("click", handleMove);
/*----- functions -----*/
//if player clicks on row 1 player will have token of red
//if player 2 click on row player 2 will have token of blue
//players click in a array if player gets 4 in a row player wins
//if player clicks 3 or less  player dosnt win;
init();
function init() {
  board = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
  ];

  turn = 1;
  gameStatus = null;
  render();
  winner = null;
}
function render() {
  board.forEach(function (colArr, colIdx) {
    colArr.forEach(function (cellVal, rowIdx) {
      //select the div for colidx and rowidx
      let currPos = document.getElementById(`c${colIdx}r${rowIdx}`);
      currPos.style.backgroundColor = PLAYERS_COLORS[cellVal];
    });
  });
}

function handleMove(evt) {
  if (evt.target.id === "markers" || winner) return;
  let colIdx = evt.target.id[1];
  let rowIdx = board[colIdx].indexOf(0);
  board[colIdx][rowIdx] = turn;
  winner = checkWin(colIdx, rowIdx);
  console.log(winner);
  turn = turn * -1;
  render();
}
function checkWin(colIdx, rowIdx) {
  let winner = verWin(colIdx, rowIdx) || checkHorzWin(colIdx, rowIdx);
  return winner;
}

function verWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1;
  rowIdx--;
  while (rowIdx >= 0 && board[colIdx][rowIdx] === player) {
    count++;
    rowIdx--;
  }
  return count === 4 ? player : null;
}

function checkHorzWin(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1;
  let column = colIdx - 1;

  while (column >= 0 && board[column][rowIdx] === player) {
    count++;
    column--;
  }

  column = colIdx + 1;
  while (column < board.length && board[colIdx][rowIdx] === player) {
    count++;
    column++;
  }
  return count === 4 ? player : null;
}
