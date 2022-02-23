import React from "react";

export default function CardContainer({ card: { id, name, image }, onClick }) {
  const handleClick = () => {
    onClick(id);
  };
  return (
    <div className="card" data-id={id} key={id} onClick={handleClick}>
      {name}
      <img src={image} alt={name} />
    </div>
  );
}
