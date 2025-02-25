import React, { useState, useEffect } from 'react';
import './JKCatchApp.css';
import CharacterBoard from './CharacterBoard';
import Popup from './Popup';

function JKCatchApp() {
  const GAME_TIME = 30; // 게임 제한 시간 (초)
  const [score, setScore] = useState(0); // 점수 상태
  const [timeLeft, setTimeLeft] = useState(GAME_TIME); // 남은 시간
  const [gameRunning, setGameRunning] = useState(false); // 게임 실행 여부
  const [openPopup, setOpenPopup] = useState(false); // 팝업창

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

  // 게임 방법 팝업창
  const how = () => {
    setGameRunning(false);
    setOpenPopup(true);
    document.body.style.overflow = "hidden";
  };

  console.log("OpenPopup", openPopup);

  return (
    <div className="jk-catch-wrap">
      <figure className="bg">
        <img src="/img/bg-img.png" alt="bg" />
      </figure>
      <div className="inner">
        <div className="info">
          <p className="time-left"><span>Time:</span> {timeLeft}<span className="s">sec</span></p>
          <p className="score"><span>Score:</span> {score}</p>
        </div>

        <div className="game-buttons">
          <div className="btn-inner">
            {/* 게임 방법 팝업창 */}
            <button type="button" className="how-to-paly" onClick={how}>How to <br /> Play</button>

            {/* 게임 시작 */}
            <button type="button" className="play" onClick={startGame} disabled={gameRunning}>
              {gameRunning ? "Game In Progress..." : "PLAY"}
            </button>
            {/* 게임 리셋 */}
            <button type="button" className="reset" onClick={resetGame} disabled={gameRunning}>
              RESET
            </button>
            {/* 게임 중단 */}
            <button type="button" className="stop" onClick={stopGame} disabled={!gameRunning}>
              STOP
            </button>
          </div>

        </div>

        <CharacterBoard gameRunning={gameRunning} setScore={setScore} />

        {openPopup ? <Popup setOpenPopup={setOpenPopup} /> : ""}
      </div>


    </div>
  );
}

export default JKCatchApp;
