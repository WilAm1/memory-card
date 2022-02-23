import React, { useEffect, useState } from "react";
import ScoreView from "./ScoreView";
import CardContainer from "./CardContainer";
import { shuffle } from "./utilities/utilities";
import GameOverModal from "./utilities/GameOver";

export default function Main(props) {
  // State
  // TODO modify later to use object on related state (leveling up)
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(score);
  const [cardsClicked, setCardsClicked] = useState([]);
  const [level, setLevel] = useState(1);
  const [cardLimit, setCardLimit] = useState(2);
  const [cards, setCards] = useState([]);
  const [mainAPI, setMainAPI] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // useEffect
  useEffect(() => {
    // Fetches the whole API call onLoad. One time only.
    console.log("I fetched some API !");
  }, []);

  useEffect(() => {
    // * Shuffles the whole api call
    const shuffledAPI = shuffle(props.data.data);
    console.log(shuffledAPI);
    setCards(shuffledAPI.slice(0, cardLimit));
  }, [cardLimit]);

  useEffect(() => {
    if (cards.length && score === cards.length) {
      console.log("leveled UP!");
      levelUp();
    }
  }, [score]);

  const levelUp = () => {
    setCardsClicked([]);
    setCardLimit(cardLimit + 2);
    setLevel(level + 1);
  };

  const resetGame = () => {
    console.log("Game Over");
    if (score > highScore) {
      setHighScore(score);
    }
    setScore(0);
    setCardLimit(2);
    setCardsClicked([]);
  };

  const handleClick = (id) => {
    // Game Over
    if (cardsClicked.indexOf(id) > -1) {
      setGameOver(true);
      return;
    }
    setCardsClicked(cardsClicked.concat(id));
    setScore(score + 1);
  };

  const handleNewGame = () => {
    setGameOver(false);
    resetGame();
  };
  // TODO Restart the Game and Add Modal Game Over Requring you to restart the game
  return (
    <main className="main game">
      {/* Show Modal if Game Over */}
      <GameOverModal display={gameOver} handleClick={handleNewGame} />
      <ScoreView score={score} highScore={highScore} />
      <CardContainer cards={cards} handleClick={handleClick} />
    </main>
  );
}
