var data = {
  playerTurn: 1,
  self: '',
  usedSquares: [],
  board: [['','',''],['','',''],['','','']]
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
      if (data.board[i][0] === data.board[i][1] && data.board[i][0] === data.board[i][2]) {
        console.log('row ', i , ' is winner');
      }
    }
    //checkY

    //checkDiagonal
  }
};



$('.board').on('click', '.square', function () {
  data.self = this;
  doStuff.checkMove();
});
