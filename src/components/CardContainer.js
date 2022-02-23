import React from "react";
import Card from "./Card";
import { shuffle } from "./utilities/utilities";

export default function CardContainer({ handleClick, cards }) {
  const shuffledCards = shuffle(cards.slice());
  return (
    <div id="card-container" className="card-wrapper">
      {shuffledCards.map((card) => {
        return <Card card={card} onClick={handleClick} key={card.id} />;
      })}
    </div>
  );
}
