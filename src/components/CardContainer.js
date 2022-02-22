import React from "react";

export default function CardContainer({ cards }) {
  return (
    <div id="card-container" className="card-wrapper">
      {cards.map((card) => {
        return (
          <div className="card" data-id={card.id} key={card.id}>
            {card.name}
          </div>
        );
      })}
    </div>
  );
}
