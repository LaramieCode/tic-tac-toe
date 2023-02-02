const TicTacToe = (function () {
  const players = (function () {
    const X = { move: "x" };
    const O = { move: "o" };
    const playerTurn = X;
    return { X, O, playerTurn };
  })();
  const gameBoard = (function () {
    let array = ["", "", "", "", "", "", "", "", ""];
    let winningScenarios = function () {
      return [
        [array[0], array[1], array[2]],
        [array[3], array[4], array[5]],
        [array[6], array[7], array[8]],
        [array[0], array[3], array[6]],
        [array[1], array[4], array[7]],
        [array[2], array[5], array[8]],
        [array[0], array[4], array[8]],
        [array[2], array[4], array[6]],
      ];
    };
    return { array, winningScenarios };
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
  const game = (function () {
    let status = true;
    const checkWinner = function () {
      let array = gameBoard.winningScenarios();
      array.forEach(function (value, index) {
        if (
          value[0] == players.playerTurn.move &&
          value[0] == value[1] &&
          value[1] == value[2]
        ) {
          game.status = false;
          console.log(`${players.playerTurn.move} wins`);
        }
      });
    };
    return { checkWinner, status };
  })();
  dom.board.addEventListener("click", function (e) {
    if (!game.status) return; // returns if game is not active
    if (e.target.id == "") return; // returns if clicks board instead of a square
    if (e.target.innerText.length > 0) return; // returns if square is already used / only works after render
    gameBoard.array[e.target.id] = players.playerTurn.move; // updates gameBoard.array with input
    game.checkWinner();
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
  return { gameBoard, game };
})();
