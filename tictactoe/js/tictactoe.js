var data = {
  playerTurn: 1,
  self: '',
  usedSquares: [],
  board: [['','',''],['','',''],['','','']],
  checkWinner: 0,
  winner: '',
  movesCount: 0,
};

var persistent = {
  scoreBoard: [0,0]
}

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
      var backgroundimage = 'url(images/dogtongue.gif)';
      var shift = '0 0';
    } else {
      var backgroundimage = 'url(images/catwiggle.gif)';
      var shift = '-50px 0';
    }
  $(data.self).css({'background': backgroundimage,
                    'background-size': 'cover',
                    'background-position': shift});
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
      data.winner = 'Player 1';
      doStuff.endgame();
    } else if (data.checkWinner === -3) {
      data.winner = 'Player 2';
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
    if (data.winner === 'Player 1') {
      persistent.scoreBoard[0] ++;
      var winText = 'DOGS WIN!!!';
      var bckGnd = 'url(images/dogcatch.gif)';
      var posn = '-50px 0';
      var size = '160%';
      var textSpot = 'bottom';
    }
    if (data.winner === 'Player 2') {
      persistent.scoreBoard[1] ++;
      var winText = 'CATS WIN!!!';
      var bckGnd = 'url(images/catpewpew.gif)';
      var posn = '-98px 0';
      var size = '134%';
      var textSpot = 'top';

    }
    if (data.winner === 'tie') {
      var winText = 'It\'s a tie :-/';
      var bckGnd = 'url(images/dogcatlick.gif)';
      var posn = '-98px 0';
      var size = '136%';
      var textSpot = 'bottom';
    }

    $('.endgame').css({'background': bckGnd,
                        'background-size': size,
                        'background-position': posn,
                        'position': 'relative',
                        'text-align': 'center'});
    var h2 = $('<h2>').attr('class', 'winnertext').text(winText);
    h2.css({'position': 'absolute',
              'width': '100%',
              'margin': 'auto',
              'font-size':'300%'}).css(textSpot, '0');
    $('.endgame').append(h2);
    $('.dogText').html(persistent.scoreBoard[0]);
    $('.catText').html(persistent.scoreBoard[1]);
    // $('.scoreBoard').html('Dogs - ' + persistent.scoreBoard[0] + ' : ' + persistent.scoreBoard[1] + ' - Cats');
  $('.flip').toggle();
  },

  resetBoard: function () {
    data = {
      playerTurn: 1,
      self: '',
      usedSquares: [],
      board: [['','',''],['','',''],['','','']],
      checkWinner: 0,
      winner: '',
      movesCount: 0,
    }
    $('.square').css({'background-color': 'papayawhip',
                      'background': ''});
    $('.winnertext').remove();
    $('.endgame').css({'background': ''});
    $('body').css({'background': ''});
    $('.flip').toggle();
  }
};


$('.board').on('click', '.square', function () {
  data.self = this;
  doStuff.checkMove();
});

$('.rsetbttn').on('click', function () {
  doStuff.resetBoard();
})
