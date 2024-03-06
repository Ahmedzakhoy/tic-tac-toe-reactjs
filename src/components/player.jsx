import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleEditClick() {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleInputChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameElement = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";
  if (isEditing) {
    playerNameElement = (
      <input
        onChange={handleInputChange}
        type="text"
        value={playerName}
        required
      />
    );
    btnCaption = "Save";
  }

  return (
    <li
      className={isActive ? "active" : ""}
      onKeyDown={(event) => {
        if (event.code !== "Enter") return;
        handleEditClick();
      }}
    >
      <span className="player">
        {playerNameElement}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
    </li>
  );
}
