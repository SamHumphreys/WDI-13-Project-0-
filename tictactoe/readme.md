Project 0 - Tic Tac Toe
=======================
By Sam Humphreys
----------------

### Technology used:
HTML, JavaScript (including [jQuery](http://jquery.com)) and CSS (including [normalize.css](https://necolas.github.io/normalize.css/)) were used to create this substandard game.

### CSS and HTML:

The board set up is a div with 9 smaller divs within it to make up the style of the board. As you hover over each square the hot pink fades in and out.

The board is set up to be height and width 75vh, so it will scale as the screen size is changed. This works down to phone size as long as it is in landscape mode.

Once the game is over the board div will be hidden, and the result screen and replay button will be revealed. Once the game is reset the engame screen and button are hidden and the board revealed.

### JAVASCRIPT:

The flow of the game is:

- The page loads with the board and scoreboard shown and the endgame and reset buttons hidden.
- Once the page has loaded it will turn on event listeners on clicking the board div, clicking the endgame div, and clicking the reset button.
- The game will start with it being the dog's (Player 1, +1) turn.
- Every time a square is clicked the game will:
  1. doStuff.checkMove --> Check to see that the square hasn't already been played. If it has it ignores the move. If not it will go to doStuff.haveTurn

  2. doStuff.haveTurn --> Increase the data.movesCount by 1. Check to see whose turn it is, and update the clicked box image and pending move advice as appropriate. It will updated the data.usedSquares array for the next turn's checkMove function. It will run doStuff.updateBoard, and then doStuff.checkBoard

  3. doStuff.updateBoard --> updates the data.board with the player's move (1 for Player 1, -1 for Player 2).

  4. doStuff.checkBoard --> Iterates through data.board and calls doStuff.checkForWinner for each combination. Before checking each one it will check to see if there is already a winner to stop the endgame from running twice in the case the winning move causing two winning combinations.

  5. doStuff.checkForWinner --> If a row, column or diagonal adds up to 3 (ie, player 1 has all the spots on that row) it will update data.winner to be Player 1. If a row, column or diagonal adds up to -3 then data.winner is Player 2. If there is no winner it checks if it is a tie in doStuff.checkForTie.
  If there is no winner it will update the message about whose go it is next and wait for another click on the board.

  6. If there have been 9 moves with no winner (ie, a tie) then the winner is "tie" and doStuff.endgame will run.

  7. dostuff.endgame --> If the game has a winner or is a tie then this function will check to see who won, update the endgame div background picture with either the dog, cat or tie winner picture and the appropriate sound file.
  It will also update the scoreboard.
  Once the endgame div is prepared it will toggle all of the divs with the "flip" class. This will hide the board and show the endgame div and reset button. If you click the endgame picture or the button it will run doStuff.resetBoard

  8. doStuff.resetBoard --> This function resets the board, updates the text for whose go it is, deletes the sound event, and then toggles the "flip" class divs again to show the board and hide the endgame.

### Features to add:
- be able to alter the board size (This would require the board to be redone as it is hard coded in the HTML)
