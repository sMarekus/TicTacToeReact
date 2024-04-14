import { useState } from 'react';

function Square({value, onSquareClick, highlight}) {
  return (
    <button className={`square ${highlight ? 'highlight' : ''}`} onClick={onSquareClick}>
      { value }
    </button>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function Board({ xIsNext, squares, onPlay }) {
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];

  function handleClick(i) {
    if (squares[i] || winner) {
      return;
    }

    const row = Math.floor(i / 3);
    const col = i % 3;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares, {row, col, i});
  }

  let status;

  if (winner) {
    status = `Winner: ${winner}`;
  } else if (!squares.includes(null)) {
    status = "Draw";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  const size = 3;
  const board = [];

  for (let row = 0; row < size; row++) {
    const currentRow = [];

    for (let col = 0; col < size; col++) {
      const index = row * size + col;
      const isHighlight = winningLine.includes(index);
      currentRow.push(
        <Square 
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
          highlight={isHighlight}
        />
      );
    }
    board.push(<div key={row} className="board-row">{currentRow}</div>);
  } 

  return (
    <>
      <div className="status">{ status }</div>
      {board}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([{squares: Array(9).fill(null), lastMove: null}]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, moveDetails) {
    const nextHistory = history.slice(0, currentMove + 1).concat([{squares: nextSquares, lastMove: moveDetails}]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function handleSortToggle() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((squares, move) => {
    const desc = move ?
      `Go to move #${move} (row: ${squares.lastMove.row + 1}), col: ${squares.lastMove.col + 1})` :
      'Go to game start';

    return (
      <li key={move}>
        {move === currentMove ? (
          <strong>{desc}</strong>
        ) : (
          <button onClick={() => jumpTo(move)}>{desc}</button>
        )}
      </li>
    );
  });

  if (!isAscending) {
    moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={handleSortToggle}>
          {isAscending ? "Sort Descending" : "Sort Ascending"}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
