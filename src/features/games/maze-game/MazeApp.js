import React, { useState, useEffect } from 'react';
import './MazeApp.css';
import Maze from "./Maze";

function MazeApp() {
  const [stage, setStage] = useState(1);
  const [gameWon, setGameWon] = useState(false);

  const nextStage = () => {
    setGameWon(false);
    setStage(stage + 1);
  };

  return (
    <div className="maze-wrap">
      <h1>Maze Game - Stage {stage}</h1>
      {gameWon ? (
        <div>
          <p className="win-massage"> Stage {stage} Clear!</p>
          <button type="button" onClick={nextStage}> Next Stage </button>
        </div>
      ) : (
        <Maze stage={stage} onWin={() => setGameWon(true)} />
      )}
    </div>
  );
}

export default MazeApp;
