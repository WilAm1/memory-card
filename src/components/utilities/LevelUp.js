import React from "react";
import Modal from "./Modal";
export default function LevelUpModal({ handleClick, display, children }) {
  const displayModal = display ? "display-block" : "display-none";

  return (
    <Modal display={displayModal}>
      <div className="modal-content">
        {children}
        <h2>Game Over</h2>
        <button onClick={handleClick}>New Game</button>
      </div>
    </Modal>
  );
}
