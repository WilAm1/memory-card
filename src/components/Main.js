import React from "react";
import ScoreView from "./ScoreView";
import CardContainer from "./CardContainer";

export default function Main(props) {
  const apiData = props.data.data;
  console.log(apiData);
  return (
    <main className="main game">
      <ScoreView />
      <CardContainer cards={apiData} />
    </main>
  );
}
