const TicTacToe = (function () {
  const players = (function () {
    const X = { move: "x", wins: 0 };
    const O = { move: "o", wins: 0 };
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
    const resetBtn = document.querySelector(".newRoundBtn");
    const playerXWins = document.querySelector("#playerXWins");
    const playerOWins = document.querySelector("#playerOWins");
    const render = function () {
      gameBoard.array.forEach(function (value, index) {
        squares[index].innerText = value;
      });
      playerXWins.textContent = players.X.wins;
      playerOWins.textContent = players.O.wins;
    };
    return { board, squares, resetBtn, playerXWins, playerOWins, render };
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
          players.playerTurn.wins += 1;
          game.status = false;
          console.log(`${players.playerTurn.move} wins`);
        }
      });
    };
    const checkTie = function () {
      let tie = gameBoard.array.every(function (value) {
        return value.length > 0;
      });
      if (tie) {
        game.status = false;
        console.log("game tie");
      }
    };
    return { checkWinner, checkTie, status };
  })();
  dom.board.addEventListener("click", function (e) {
    if (!game.status) return; // returns if game is not active
    if (e.target.id == "") return; // returns if clicks board instead of a square
    if (e.target.innerText.length > 0) return; // returns if square is already used / only works after render
    gameBoard.array[e.target.id] = players.playerTurn.move; // updates gameBoard.array with input
    game.checkWinner();
    if (game.status) {
      game.checkTie();
    }
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
  dom.resetBtn.addEventListener("click", function () {
    gameBoard.array.forEach(function (value, index) {
      gameBoard.array[index] = "";
    });
    players.playerTurn = players.X;
    game.status = true;
    gameBoard.winningScenarios();
    dom.render();
  });
  return { gameBoard, game, dom, players };
})();
