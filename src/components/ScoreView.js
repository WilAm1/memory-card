import React from "react";

export default function ScoreView({ score, highScore }) {
  return (
    <div>
      <p>Score: {score} </p>
      <p>High Score: {highScore} </p>
    </div>
  );
}
