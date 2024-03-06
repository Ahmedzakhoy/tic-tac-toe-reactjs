// import { useState } from "react";

export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol id="game-board">
      {board.map((row, i) => {
        return (
          <li key={i}>
            <ol>
              {row.map((playerSymbol, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button
                      disabled={playerSymbol ? true : false}
                      onClick={() => onSelectSquare(i, colIndex)}
                    >
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
