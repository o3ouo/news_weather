import React, { useState, useEffect } from 'react';
import './JKCatchApp.css';
import CharacterBoard from './CharacterBoard';

function JKCatchApp() {
  const GAME_TIME = 30; // 게임 제한 시간 (초)
  const [score, setScore] = useState(0); // 점수 상태
  const [timeLeft, setTimeLeft] = useState(GAME_TIME); // 남은 시간
  const [gameRunning, setGameRunning] = useState(false); // 게임 실행 여부

  // 게임 타이머 관리
  useEffect(() => {
    if (gameRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameRunning(false); // 게임이 끝나면 멈춤
    }
  }, [gameRunning, timeLeft]);

  // 게임 시작 함수 
  const startGame = () => {
    if (gameRunning) return; // 이미 게임이 진행 중이면 아무 일도 하지 않음
    
    setGameRunning(true);
  };

  // 게임 중단 함수
  const stopGame = () => {
    setGameRunning(false);
  };

  // 게임 리셋 함수
  const resetGame = () => {
    setScore(0);
    setTimeLeft(GAME_TIME);
    setGameRunning(false);
  };
  
  return (
    <div className="jk-catch-wrap">
      <h1>
        <img src="/img/jujutsu_kaisen_logo.png" alt="jujutsu_kaisen_logo" />
      </h1>
      <p className="time-left">남은 시간: {timeLeft}초</p>
      <p className="score">점수: {score}</p>

      <div className="game-buttons">
        {/* 게임 시작 */}
        <button type="button" onClick={startGame} disabled={gameRunning}> 
          {gameRunning ? "Game In Progress..." : "Game Start" }
        </button>
        {/* 게임 중단 */}
        <button type="button" onClick={stopGame} disabled={!gameRunning}>
          Stop Game
        </button>
        {/* 게임 리셋 */}
        <button type="button" onClick={resetGame} disabled={gameRunning}>
          Reset Game
        </button>
      </div>

      <CharacterBoard gameRunning={gameRunning} setScore={setScore}/>
    </div>
  );
}

export default JKCatchApp;
