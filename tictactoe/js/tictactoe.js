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
  scoreBoard: [0,0],
  whoGoesFirst: 1,
  message: "It's the dog's turn"
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
      persistent.message = "It's the cat's turn";
    } else {
      var backgroundimage = 'url(images/catwiggle.gif)';
      var shift = '-50px 0';
      persistent.message = "It's the dog's turn";
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
    }
    $('.whoseGo').find('p').text(persistent.message);
  },

  checkForTie: function () {
    if (data.movesCount === 9 && data.winner === '') {
      data.winner = 'tie';
      doStuff.endgame();
    }
  },

  checkBoard: function () {
    //checkX
    if (data.winner === '') {
      for (var i = 0; i < data.board.length; i ++) {
        data.checkWinner = 0;
        for (var j = 0; j < data.board[i].length; j ++) {
          data.checkWinner += data.board[i][j];
        }
        doStuff.checkForWinner();
      }
    }
    //checkY
    if (data.winner === '') {
      for (var i = 0; i < data.board.length; i ++) {
        data.checkWinner = 0;
        for (var j = 0; j < data.board[i].length; j ++) {
          data.checkWinner += data.board[j][i];
        }
        doStuff.checkForWinner();
      }
    }
    //checkDiagonals
    if (data.winner === '') {
      data.checkWinner = 0;
      for (var i = 0; i < data.board.length; i ++) {
        data.checkWinner += data.board[i][i];
      }
      doStuff.checkForWinner();
    }
    if (data.winner === '') {
      data.checkWinner = 0;
      for (var i = 0; i < data.board.length; i ++) {
        data.checkWinner += data.board[2-i][i];
      }
      doStuff.checkForWinner();
    }
    if (data.winner === '') {
      doStuff.checkForTie();
    }
  },

  endgame: function () {
    if (data.winner === 'Player 1') {
      persistent.scoreBoard[0] ++;
      var winText = 'DOGS WIN!!!';
      var bckGnd = 'url(images/dogcatch.gif)';
      var victorySong = ('sounds/barkingbells.mp3');
      var posn = '-50px 0';
      var size = '160%';
      var textSpot = 'bottom';
    }
    if (data.winner === 'Player 2') {
      persistent.scoreBoard[1] ++;
      var winText = 'CATS WIN!!!';
      var bckGnd = 'url(images/catpewpew.gif)';
      var victorySong = ('sounds/EOTT.ogg');
      var posn = '-98px 0';
      var size = '134%';
      var textSpot = 'top';
    }
    if (data.winner === 'tie') {
      var winText = 'It\'s a tie :-/';
      var bckGnd = 'url(images/dogcatlick.gif)';
      var victorySong = ('sounds/itsadraw.mp3');
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
  $('.flip').toggle();
  var winnerSound = $('<audio>').attr({'src': victorySong, 'autoplay': true}).addClass('winnerSound');
  $('.reset').append(winnerSound);
  },

  resetBoard: function () {
    $('.winnerSound').remove();
    persistent.whoGoesFirst *= -1;
    data = {
      playerTurn: persistent.whoGoesFirst,
      self: '',
      usedSquares: [],
      board: [['','',''],['','',''],['','','']],
      checkWinner: 0,
      winner: '',
      movesCount: 0,
    };
    if (persistent.whoGoesFirst === 1) {
      $('.whoseGo').find('p').text("It's the dog's turn");
    } else {
      $('.whoseGo').find('p').text("It's the cat's turn");
    };
    $('.square').css({'background-color': 'papayawhip',
                      'background': ''});
    $('.winnertext').remove();
    $('.endgame').css({'background': ''});
    $('body').css({'background': ''});
    $('.flip').toggle();
  }
};



$(document).ready(function(){
  $('.rsetbttn').on('click', doStuff.resetBoard);
  $('.endgame').on('click', doStuff.resetBoard);
  $('.board').on('click', '.square', function () {
    data.self = this;
    doStuff.checkMove();
  });
});
