import React, { useEffect, useState } from "react";
import ScoreView from "./ScoreView";
import CardContainer from "./CardContainer";
import GameOverModal from "./utilities/GameOver";
import { shuffle, filterData } from "./utilities/utilities";
import axios from "axios";

const DEFAULT_CARD_LIMIT = 4;
const DEFAULT_ADD_SIZE = 2;
const API_LINK = "https://api.atlasacademy.io/export/NA/basic_servant.json";

export default function Main() {
  // State
  const blankState = {
    currentLevelScore: 0,
    score: 0,
    cardsClicked: [],
    level: 1,
  };
  const [userInfo, setUserInfo] = useState({ ...blankState });
  const [highScore, setHighScore] = useState(0);
  const [cardLimit, setCardLimit] = useState(DEFAULT_CARD_LIMIT);
  const [cards, setCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [APIData, setAPIData] = useState([]);

  useEffect(() => {
    // Fetches the whole API call onLoad. One time only.
    console.log("I fetched some API !");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(API_LINK);
      if (res.status === 200) {
        const data = res.data;
        setAPIData(data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    const shuffledCards = shuffle(APIData).slice(0, cardLimit);
    const filteredData = filterData(shuffledCards);
    setCards(filteredData);
  }, [APIData, cardLimit]);

  useEffect(() => {
    if (cards.length && userInfo.currentLevelScore === cards.length) {
      console.log("leveled UP!");
      levelUp();
    }
  }, [userInfo]);

  const levelUp = () => {
    console.log("i leveled up");
    console.log(DEFAULT_ADD_SIZE);
    setCardLimit(cardLimit + DEFAULT_ADD_SIZE);
    setUserInfo({
      ...userInfo,
      cardsClicked: [],
      currentLevelScore: 0,
      level: userInfo.level + 1,
    });
  };

  const resetGame = () => {
    console.log("Game Over");

    if (userInfo.score > highScore) {
      setHighScore(userInfo.score);
    }

    setCardLimit(DEFAULT_CARD_LIMIT);
    setUserInfo({ ...blankState, highScore });
  };

  const handleClick = (id) => {
    const { cardsClicked, currentLevelScore, score } = userInfo;
    if (cardsClicked.indexOf(id) > -1) {
      setGameOver(true);
      return;
    }
    setUserInfo({
      ...userInfo,
      cardsClicked: cardsClicked.concat(id),
      currentLevelScore: currentLevelScore + 1,
      score: score + 1,
    });
  };

  const handleNewGame = () => {
    setGameOver(false);
    resetGame();
  };

  return (
    <main className="main game">
      {/* If Level > 5 Show You win Modal! */}
      <GameOverModal display={gameOver} handleClick={handleNewGame} />
      <ScoreView
        score={userInfo.score}
        highScore={highScore}
        level={userInfo.level}
      />
      <CardContainer cards={cards} handleClick={handleClick} />
    </main>
  );
}
