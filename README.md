# Tic-Tac-Toe in React

This project is a simple implementation of the classic game Tic-Tac-Toe built using React. It includes functionality for playing the game, tracking the history of moves, and indicating the winner once a line is completed.

## Features

- **Interactive Gameplay:** Players can click on the grid to make their move.
- **History Tracking:** Every move made during the game is recorded and can be reviewed.
- **Winner Detection:** The game automatically detects and announces a winner if a player achieves three in a row.
- **Highlight Winning Combination:** The squares that form a winning line are highlighted.
- **Game Status:** Displays the current player or announces the winner.
- **Move Sorting:** Allows toggling the move history between ascending and descending order.

## Components Structure

- **Square:** Represents a single square on the board.
- **Board:** Renders a 3x3 grid of squares and manages game state.
- **Game:** Coordinates all components and maintains the state of the game across different moves.

## Setup and Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd <project-directory>

# Install dependencies
npm install

# Run the project
npm start
