import React from "react";

export default function GameOverModal({ handleClick, display, children }) {
  const displayModal = display ? "display-block" : "display-none";

  return (
    <div className={`${displayModal} modal`}>
      <div className="modal-content">
        {children}
        <h2>Game Over</h2>
        <button onClick={handleClick}>New Game</button>
      </div>
    </div>
  );
}
