import Player from "./components/player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { PLAYERS } from "./data";
import GameOver from "./components/GameOver";
import { deriveActivePlayer, deriveGameBoard, deriveWinner } from "./helpers";

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  function handlePalyerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
          playerName: players[currentPlayer],
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handlerRematch() {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePalyerNameChange}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePalyerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver onRestart={handlerRematch} winner={winner} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} player="" />
    </main>
  );
}

export default App;
