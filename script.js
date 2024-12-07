// Game state variables
const board = Array(9).fill(null);
let currentPlayer = 'X';
let scoreX = 0;
let scoreO = 0;

// DOM elements
const gameBoard = document.getElementById('game-board');
const gameStatus = document.getElementById('game-status');
const resetButton = document.getElementById('reset-button');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game board
function initializeBoard() {
  gameBoard.innerHTML = ''; // Clear existing cells
  board.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick, { once: true }); // Allow only one click
    gameBoard.appendChild(cell);
  });
  updateGameStatus(`${currentPlayer}'s Turn`);
}

// Handle cell clicks
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  // Update the board state and UI
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  // Check for a winner or a draw
  if (checkWinner()) {
    updateGameStatus(`Player ${currentPlayer} Wins!`);
    updateScore(currentPlayer);
    disableBoard();
  } else if (board.every(cell => cell)) {
    updateGameStatus(`It's a Draw!`);
  } else {
    switchPlayer();
  }
}

// Switch player turns
function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateGameStatus(`${currentPlayer}'s Turn`);
}

// Update game status message
function updateGameStatus(message) {
  gameStatus.textContent = message;
}

// Check if there's a winner
function checkWinner() {
  return winningCombinations.some(combination => {
    const [a, b, c] = combination;
    return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
  });
}

// Update player scores
function updateScore(player) {
  if (player === 'X') {
    scoreX++;
    scoreXDisplay.textContent = scoreX;
  } else {
    scoreO++;
    scoreODisplay.textContent = scoreO;
  }
}

// Disable the board after a game ends
function disableBoard() {
  document.querySelectorAll('.cell').forEach(cell => {
    cell.removeEventListener('click', handleCellClick);
  });
}

// Reset the game
resetButton.addEventListener('click', () => {
  board.fill(null); // Reset board state
  currentPlayer = 'X'; // Reset starting player
  initializeBoard(); // Rebuild the board
});

// Initialize the game on page load
initializeBoard();
