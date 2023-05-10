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
const msgEl = document.querySelector("h2");
const replay = document.querySelector("button");
/*----- event listeners -----*/
boardEl.addEventListener("click", handleMove);
buttonEls.addEventListener("click", handleMove);
replay.addEventListener("click", init);
/*----- functions -----*/

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
      let currPos = document.getElementById(`c${colIdx}r${rowIdx}`);
      currPos.style.backgroundColor = PLAYERS_COLORS[cellVal];
    });
  });
  renderMessage();
}

function handleMove(evt) {
  if (evt.target.id === "markers" || winner) return;
  let colIdx = parseInt(evt.target.id[1]);
  let rowIdx = board[colIdx].indexOf(0);
  board[colIdx][rowIdx] = turn;
  winner = checkWin(colIdx, rowIdx);
  console.log(winner);
  turn = turn * -1;
  render();
}
function checkWin(colIdx, rowIdx) {
  console.log("verticalwin", verWin(colIdx, rowIdx));
  console.log("horizontalwin", checkHorzWin(colIdx, rowIdx));
  console.log("rightdgwin", checkRightDg(colIdx, rowIdx));
  console.log("leftdgwin", checkLeftDg(colIdx, rowIdx));
  let winner =
    verWin(colIdx, rowIdx) ||
    checkHorzWin(colIdx, rowIdx) ||
    checkRightDg(colIdx, rowIdx) ||
    checkLeftDg(colIdx, rowIdx) ||
    (board.flat().includes(0) ? 0 : "T");
  console.log(winner);
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
  while (column < board.length && board[column][rowIdx] === player) {
    count++;
    column++;
  }
  return count >= 4 ? player : null;
}

function checkRightDg(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 1;
  let column = colIdx + 1;
  let row = rowIdx + 1;

  column = colIdx - 1;
  row = rowIdx - 1;
  while (column >= 0 && row >= 0 && board[column][row] === player) {
    count++;
    column--;
    row--;
  }
  console.log(count);
  return count >= 4 ? player : null;
}
function checkLeftDg(colIdx, rowIdx) {
  const player = board[colIdx][rowIdx];
  let count = 0;
  let column = colIdx;
  let row = rowIdx;
  console.log(row, column);
  while (column < board.length && row >= 0 && board[column][row] === player) {
    count++;
    column++;
    row--;
    console.log(row, column, "burrito");
  }

  return count >= 4 ? player : null;
}
function renderMessage() {
  if (winner === "T") {
    msgEl.innerHTML = "its a tie";
  } else if (winner === 1 || winner === -1) {
    msgEl.innerHTML = `<span style = "color:${
      PLAYERS_COLORS[winner]
    }">${PLAYERS_COLORS[winner].toUpperCase()}</span> wins`;
  } else {
    msgEl.innerHTML = `Player <span style="color: ${
      PLAYERS_COLORS[turn]
    }">${PLAYERS_COLORS[turn].toUpperCase()}</span>'s Turn`;
  }
}
function renderReplay() {
  if (evt.target.querySelector === "button" || winner === null) {
    replay.style.visibility = "hidden";
  } else {
    replay.style.visibility = "visible";
  }
}
