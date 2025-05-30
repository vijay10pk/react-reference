import { useState } from "react";

export default function GameBoard({ onSelectSquare, board }) {

  /*
    Since we are going to use gameTurns state to manage the turns for players we have lifted that state to app.js 
    and manage it there and pass it here because this component is the child of that*/
  /*     const [gameBoard, setGameBoard] = useState(InitialGameBoard);

    function handleSelectSquare(rowIndex, colIndex)
    {
        setGameBoard((prevGameBoard)=>{
            const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
            updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedGameBoard;
        });
        onSelectSquare();
    } */

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled = {playerSymbol !==null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
