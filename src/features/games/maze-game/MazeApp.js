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
      <h1>미로 찾기 게임 - 스테이지 {stage}</h1>
      {gameWon ? (
        <div>
          <p className="win-message">🎉 스테이지 {stage} 클리어! 🎉</p>
          <button onClick={nextStage}>다음 스테이지</button>
        </div>
      ) : (
        <Maze stage={stage} onWin={() => setGameWon(true)} />
      )}
    </div>
  );
}
