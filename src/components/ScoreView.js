import React from "react";

export default function ScoreView({ level, score, highScore }) {
  return (
    <div className="game-data">
      <h2>Level {level}</h2>
      <h3>
        Score: <span className="user-score">{score}</span> High Score:
        <span className="user-highScore"> {highScore}</span>
      </h3>
    </div>
  );
}
