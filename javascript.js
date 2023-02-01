const TicTacToe = (function () {
  const players = (function () {
    const X = { move: "x" };
    const O = { move: "o" };
    const playerTurn = X;
    return { X, O, playerTurn };
  })();
  const gameBoard = (function () {
    array = ["", "", "", "", "", "", "", "", ""];
    return { array };
  })();
  const dom = (function () {
    const board = document.querySelector(".board");
    const squares = document.querySelectorAll(".boardSquares");
    const render = function () {
      gameBoard.array.forEach(function (value, index) {
        squares[index].innerText = value;
      });
    };
    return { board, squares, render };
  })();
  dom.board.addEventListener("click", function (e) {
    if (e.target.id == "") return; // returns if clicks board instead of a square
    if (e.target.innerText.length > 0) return; // returns if square is already used / only works after render
    gameBoard.array[e.target.id] = players.playerTurn.move; // updates gameBoard.array with input
    switch (players.playerTurn) {
      case players.X:
        players.playerTurn = players.O;
        break;
      case players.O:
        players.playerTurn = players.X;
        break;
      default:
        console.log("this shouldnt happen");
    }
    dom.render();
  });
})();
