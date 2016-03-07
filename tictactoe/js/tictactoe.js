var data = {
  playerTurn: 1,
  self: ''
};

var doStuff = {
  haveTurn: function () {
    var color = '';
    if (data.playerTurn === 1) {
      color = 'red';
    } else {
      color = 'blue';
    }
  $(data.self).css({'background-color': color});
  data.playerTurn = -data.playerTurn;
  },
};

$('.board').on('click', '.square', function () {
  data.self = this;
  console.log(this);
  doStuff.haveTurn();
});
