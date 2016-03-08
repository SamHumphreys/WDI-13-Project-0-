var data = {
  playerTurn: 1,
  self: '',
  usedSquares: [],
  board: [['','',''],['','',''],['','','']],
  checkWinner: 0,
  winner: '',
  movesCount: 0
};


var doStuff = {
  checkMove: function () {
    for (var i = 0; i < data.usedSquares.length; i ++) {
        if ($(data.self).attr('id') === data.usedSquares[i]) {
          return;
        }
    }
    doStuff.haveTurn();
  },

  haveTurn: function () {
    var color = '';
    var id = '';
    data.movesCount ++;
    if (data.playerTurn === 1) {
      color = 'red';
    } else {
      color = 'blue';
    }
  $(data.self).css({'background-color': color});
  data.usedSquares.push($(data.self).attr('id'));
  this.updateBoard();
  data.playerTurn = -data.playerTurn;
  doStuff.checkBoard();
  },

  updateBoard: function () {
    var square = $(data.self).attr('id');
    xSpot = square[1];
    ySpot = square[2];
    data.board[xSpot][ySpot] = data.playerTurn;
  },

  checkForWinner: function() {
     if (data.checkWinner === 3) {
      data.winner = 'Player1';
      doStuff.endgame();
    } else if (data.checkWinner === -3) {
      data.winner = 'Player2';
      doStuff.endgame();
    } else if (data.movesCount === 9  && data.winner === '') {
      data.winner = 'tie';
      doStuff.endgame();
    }
  },

  checkBoard: function () {
    //checkX
    for (var i = 0; i < data.board.length; i ++) {
      data.checkWinner = 0;
      for (var j = 0; j < data.board[i].length; j ++) {
        data.checkWinner += data.board[i][j];
      }
      doStuff.checkForWinner();
    }
    //checkY
    for (var i = 0; i < data.board.length; i ++) {
      data.checkWinner = 0;
      for (var j = 0; j < data.board[i].length; j ++) {
        data.checkWinner += data.board[j][i];
      }
      doStuff.checkForWinner();
    }
    //checkDiagonals
    data.checkWinner = 0;
    for (var i = 0; i < data.board.length; i ++) {
      data.checkWinner += data.board[i][i];
    }
    doStuff.checkForWinner();
    data.checkWinner = 0;
    for (var i = 0; i < data.board.length; i ++) {
      data.checkWinner += data.board[2-i][i];
    }
    doStuff.checkForWinner();
  },

  endgame: function () {
    console.log('winner is ' + data.winner);
    console.log('the game is over, man');
  }
};


$('.board').on('click', '.square', function () {
  data.self = this;
  doStuff.checkMove();
});
