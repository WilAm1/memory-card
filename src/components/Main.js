import React, { useEffect, useState } from "react";
import ScoreView from "./ScoreView";
import CardContainer from "./CardContainer";
import { shuffle } from "./utilities/utilities";
import GameOverModal from "./utilities/GameOver";

export default function Main(props) {
  // State
  // TODO modify later to use object on related state (leveling up)
  const [currentScore, setCurrentScore] = useState(0);
  const [score, setScore] = useState(currentScore);
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
    // https://pokeapi.co/api/v2/type Fetches Array with multiple types
    console.log("I fetched some API !");
    getMainData();
  }, []);

  const getMainData = () => {
    fetch("https://pokeapi.co/api/v2/type/")
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        data.results.splice(18, 1);
        setMainAPI(data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const getPokemon = async (url) => {
    console.log(url);
    try {
      const res = await fetch(url);
      const data = await res.json();
      const {
        name,
        id,
        sprites: { back_default: image },
      } = data;
      return { name, image, id };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getType = (url) => {
    if (!url) return;
    console.log(url.url);
    fetch(url.url)
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then(async (data) => {
        //   Get the image from url then spirtes/front_default
        const shuffledAPI = shuffle(data.pokemon).slice(0, cardLimit);
        console.log(shuffledAPI);
        // const promises = shuffledAPI.map(
        //   async ({ pokemon: { url } }) => await getPokemon(url)
        // );
        // const something = Promise.all(promises);
        // setCards(shuffledAPI.slice(0, cardLimit));
        const something = await Promise.all(
          shuffledAPI.map(({ pokemon: { url } }) => getPokemon(url))
        );
        console.log(something);
        setCards(something);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // * get some random type and put it into the cards state
    // * shuffles
    console.log(mainAPI);
    const randomTypeURL = mainAPI[Math.floor(Math.random() * mainAPI.length)];
    getType(randomTypeURL);
  }, [mainAPI, cardLimit]);

  useEffect(() => {
    if (cards.length && currentScore === cards.length) {
      console.log(currentScore, cards.length);
      console.log("leveled UP!");
      levelUp();
    }
  }, [currentScore]);

  const levelUp = () => {
    setCardsClicked([]);
    setCardLimit(cardLimit + 2);
    setLevel(level + 1);
    setCurrentScore(0);
  };

  const resetGame = () => {
    console.log("Game Over");
    if (score > highScore) {
      setHighScore(score);
    }
    setCurrentScore(0);
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
    setCurrentScore(currentScore + 1);
    setScore(currentScore + 1);
  };

  const handleNewGame = () => {
    setGameOver(false);
    resetGame();
  };

  return (
    <main className="main game">
      {/* If Level > 5 Show You win Modal! */}
      <GameOverModal display={gameOver} handleClick={handleNewGame} />
      <ScoreView score={score} highScore={highScore} />
      <CardContainer cards={cards} handleClick={handleClick} />
    </main>
  );
}
