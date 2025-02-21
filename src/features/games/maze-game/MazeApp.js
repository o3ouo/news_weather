import React, { useState } from "react";
import './MazeApp.css'
import Maze from "./Maze";

export default function App() {
  const [stage, setStage] = useState(1);
  const [gameWon, setGameWon] = useState(false);

  const nextStage = () => {
    setGameWon(false);
    setStage(stage + 1);
  };

  return (
    <div className="maze-wrap">
      {gameWon ? (
        <div className="clear-box">
          <p className="win-message">🎉 STAGE{stage} <span>CLEAR!</span> 🎉</p>
          <button type="button" className="next-button" onClick={nextStage}>Next Stage</button>
          <figure className="clear-img">
            <img src="/img/clear-img.png" alt="clear-img" />
          </figure>
        </div>
      ) : (
        <div className="stage-box">
          <h1><span>Maze Game</span> - Stage {stage}</h1>
          <Maze stage={stage} onWin={() => setGameWon(true)} />
        </div>
      )}
    </div>
  );
}
