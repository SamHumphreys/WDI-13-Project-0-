var data = {
  playerTurn: 1,
  self: '',
  usedSquares: [],
  board: [['','',''],['','',''],['','','']],
  checkWinner: 0
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
    if (data.playerTurn === 1) {
      color = 'red';
    } else {
      color = 'blue';
    }
  $(data.self).css({'background-color': color});
  data.usedSquares.push($(data.self).attr('id'));
  this.updateBoard();
  data.playerTurn = -data.playerTurn;
  doStuff.checkWinner();
  },

  updateBoard: function () {
    var square = $(data.self).attr('id');
    xSpot = square[1];
    ySpot = square[2];
    data.board[xSpot][ySpot] = data.playerTurn;
  },
  checkWinner: function () {
    //checkX
    for (var i = 0; i < data.board.length; i ++) {
      data.checkWinner = 0;
      for (var j = 0; j < data.board[i].length; j ++) {
        data.checkWinner += data.board[i][j];
      }
      if (data.checkWinner === 3) {
        console.log('positive wins');
        return;
      }
      if (data.checkWinner === -3) {
        console.log('negative wins');
        return;
      }
    }
    //checkY
    for (var i = 0; i < data.board.length; i ++) {
      data.checkWinner = 0;
      for (var j = 0; j < data.board[i].length; j ++) {
        data.checkWinner += data.board[j][i];
      }
      if (data.checkWinner === 3) {
        console.log('positive wins');
        return;
      }
      if (data.checkWinner === -3) {
        console.log('negative wins');
        return;
      }
    }
    //checkDiagonal
    data.checkWinner = 0;
    for (var i = 0; i < data.board.length; i ++) {
      data.checkWinner += data.board[i][i];
    }
    if (data.checkWinner === 3) {
      console.log('positive wins');
      return;
    }
    if (data.checkWinner === -3) {
      console.log('negative wins');
      return;
    }
    data.checkWinner = 0;
    for (var i = 0; i < data.board.length; i ++) {
      data.checkWinner += data.board[2-i][i];
    }
    if (data.checkWinner === 3) {
      console.log('positive wins');
      return;
    }
    if (data.checkWinner === -3) {
      console.log('negative wins');
      return;
    }
  }

};



$('.board').on('click', '.square', function () {
  data.self = this;
  doStuff.checkMove();
});
