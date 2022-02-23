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
    <div className="card" data-id={id} key={id} onClick={handleClick}>
      <img src={face} alt={name} />
      <p>{getRarity(rarity)}</p>
      {name}
    </div>
  );
}
