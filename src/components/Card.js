import React from "react";

export default function CardContainer({
  card: { id, name, face, rarity },
  onClick,
}) {
  const handleClick = () => {
    onClick(id);
  };
  const getRarity = (num) => {
    return new Array(num).fill("⭐").join("");
  };
  return (
    <div
      className="card"
      data-id={id}
      onClick={handleClick}
      data-rarity={rarity}
      style={{
        backgroundImage: `url(${face})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <span className="stars">{getRarity(rarity)}</span>
      <div className="card-data">
        <p className="card-name">{name}</p>
      </div>
    </div>
  );
}
