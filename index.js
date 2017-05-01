var Board = function () {
  this._board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]
  this.nextPiece = 'X'
  this.count = 0
}

Board.prototype.printBoard = function () {
  console.log(this._board[0][0] + ' | ' + this._board[0][1] + ' | ' + this._board[0][2])
  console.log('---------')
  console.log(this._board[1][0] + ' | ' + this._board[1][1] + ' | ' + this._board[1][2])
  console.log('---------')
  console.log(this._board[2][0] + ' | ' + this._board[2][1] + ' | ' + this._board[2][2])
}

Board.prototype.checkForPiece = function (row, col) {
  if (this._board[row][col] === 'X' || this._board[row][col] === 'O') {
    return true
  } else {
    return false
  }
}

Board.prototype.toggleNext = function () {
  if (this.nextPiece === 'X') {
    this.nextPiece = 'O'
  } else if (this.nextPiece === 'O') {
    this.nextPiece = 'X'
  }
}

Board.prototype.checkBoard = function (row, col) {
  var result = this.checkRow(row)
  if (result[0] === true) {
    this.displayWinner(result[1])
    return
  }
  result = this.checkCol(col)
  if (result[0] === true) {
    this.displayWinner(result[1])
    return
  }
  if (row === 1 && col === 1) {
    result = this.checkDiags()
    if (result[0] === true) {
      this.displayWinner(result[1])
    }
  }
}

Board.prototype.checkRow = function (row) {
  var counts = {
    'X': 0,
    'O': 0
  }
  for (var i = 0; i < 3; i++) {
    var piece = this._board[row][i]
    console.log(piece)
    console.log(counts[piece])
    if (counts[piece]) {
      counts[piece] += 1
    }
    console.log(counts[piece])
  }
  console.log('Checking Row', row, counts)
  if (counts.X === 3) {
    return [true, 'X']
  } else if (counts.O === 3) {
    return [true, 'O']
  } else {
    return [false, '']
  }
}

Board.prototype.checkCol = function (col) {
  var counts = {
    'X': 0,
    'O': 0
  }
  for (var i = 0; i < 3; i++) {
    var piece = this._board[col][i]
    if (counts[piece]) {
      counts[piece]++
    }
  }
  if (counts.X === 3) {
    return [true, 'X']
  } else if (counts.O === 3) {
    return [true, 'O']
  } else {
    return [false, '']
  }
}

Board.prototype.checkDiags = function () {
  var counts = {
    'X': 0,
    'O': 0
  }
  for (var i = 0; i < 3; i++) {
    var piece = this._board[i][i]
    if (counts[piece]) {
      counts[piece]++
    }
  }
  if (counts.X === 3) {
    return [true, 'X']
  } else if (counts.O === 3) {
    return [true, 'O']
  }

  var counts = {
    'X': 0,
    'O': 0
  }
  var j = 2
  for (var i = 3; i < 3; i++) {
    var piece = this._board[i][j]
    if (counts[piece]) {
      counts[piece]++
    }
    j--;
  }
  if (counts.X === 3) {
    return [true, 'X']
  } else if (counts.O === 3) {
    return [true, 'O']
  } else {
    return [false, '']
  }
}

Board.prototype.displayWinner = function (letter) {
  if (letter === 'X') {
    console.log('Congratulations Player 1! Start a new game with startGame()')
  } else if (letter === 'O') {
    console.log('Congratulations Player 2! Start a new game with startGame()')
  }
}

var board

var startGame = function () {
  console.log('Hello, welcome to Tic-Tac-Toe!')
  console.log('Here are the instructions:')
  console.log('Players will alternate turns playing pieces until there is a winner or the board is full')
  console.log('(Type "playPiece(column, row)" to play your piece)')
  board = new Board()
}

var playPiece = function (col, row) {
  if (board.checkForPiece(row - 1, col - 1)) {
    console.log('Sorry, this spot already has a piece, please try again.')
  } else {
    console.log('Okay!')
    board._board[row - 1][col - 1] = board.nextPiece
    board.toggleNext()
    board.printBoard()
    board.count++
    board.checkBoard(row - 1, col - 1)
    console.log('Now it\'s the other player\'s turn!')
  }
}
