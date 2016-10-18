var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var Board = function() {
  this.squares = [[0,0,0], [0,0,0], [0,0,0]];
};

Board.prototype.move = function(x, y) {
  this.squares[x][y] = 1;
};

Board.prototype.winCheck = function() {

  var rowCheck = function(board) {
    var win = false;
    board.forEach(function(row) {
      var rowSum = row.reduce(function(a, b) {
        return a + b;
      });
      if (rowSum === 3) {
        win = true;
      }
    });
    return win;
  };

  var columnCheck = function(board) {
    var win = false;
    board.forEach(function(_, index) {
      var columnSum = board.reduce(function(a, row) {
        return a + row[index];
      }, board[0][index])
      if (columnSum === 3) {
        win = true;
      }
    });

    return win;
  };

  var diagonalCheck = function(board) {
    if (board[0, 0] + board[1, 1] + board[2, 2] === 3) {
      return true;
    }
    if (board[0, 2] + board[1, 1] + board[0, 1] === 3) {
      return true;
    }
    return false;
  };

  return rowCheck(this.squares) || columnCheck(this.squares) || diagonalCheck(this.squares);
};

Board.prototype.render = function() {
  var charMap = {
    '0': ' ',
    '1': 'X' 
  };

  var transform = function(board) {
    var output = '';
    board.forEach(function(row){
      var segment = '';
      row.forEach(function(square) {
        segment += charMap[square];
      });
      segment += '\n';
      output += segment;
    });
  };

  console.log(transform(this.squares));
};

var play = function() {
  console.log('Let\'s play tic-tac-toe!\n');
  var boardy = new Board();
  var player = 'Player 1';
  var flipPlayer = function(string) {
    if (string[-1] === '1') {
      return string.slice(0, -1) + '2';
    } else {
      return string.slice(0, -1) + '1';
    }
  };

  while (!boardy.winCheck()) {
    var move = '';
    rl.nextMove('Your move, ' + player + ':\n', function(string) {
      move = string
      r.close();
    });
    var x = parseInt(move[0]);
    var y = parseInt(move[3]);
    boardy.move(x, y);
    boardy.render();
    player = flipPlayer(player);
  };

  console.log('You win, ' + player + '!')
};

play();