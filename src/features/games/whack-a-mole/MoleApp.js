import React, { useState, useEffect } from 'react';
import './MoleApp.css';
import MoleBoard from './MoleBoard';

function MoleApp() {
  const gameTime = 30; // 게임 제한 시간 (초)
  const [score, setScore] = useState(0); // 점수 상태
  const [timeLeft, setTimeLeft] = useState(gameTime); // 남은 시간
  const [gameRunning, setGameRunning] = useState(false); // 게임 실행 여부

  // 게임 타이머 관리
  useEffect(() => {
    if (gameRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameRunning(false);
    }
  }, [gameRunning, timeLeft]);

  // 게임 시작 함수 
  const startGame = () => {
    setScore(0);
    setTimeLeft(gameTime);
    setGameRunning(true);
  };
  
  return (
    <div className="mole-wrap">
      <h1>Whack-a-Mole Game</h1>
      <p className="time-left">남은 시간: {timeLeft}초</p>
      <p className="score">점수: {score}</p>
      <button 
        type="button" 
        onClick={startGame}
        disabled={gameRunning} // 비활성화
      >
        {gameRunning ? "Game In Progress..." : "Game Start" }
      </button>

      <MoleBoard gameRunning={gameRunning} setScore={setScore}/>
    </div>
  );
}

export default MoleApp;
