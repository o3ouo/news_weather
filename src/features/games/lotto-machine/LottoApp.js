import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import './LottoApp.css'
import Ball from './Ball';

const getWinNumbers = () => {
  // 로또 번호 생성
  const balls = Array(45).fill().map((v, i) => i + 1);
  const shuffle = []; // 섞은 번호를 담을 빈 그릇

  while (balls.length > 0) {
    shuffle.push(balls.splice(Math.floor(Math.random() * balls.length), 1)[0]);
  }

  const bonus = shuffle[shuffle.length - 1];
  const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);

  return [...winBalls, bonus];
}

function LottoApp() {
  const lottoNumbers = useMemo(() => getWinNumbers(), []); 
  const [winNumbers, setWinNumbers] = useState(lottoNumbers); // 미리 뽑아둔 숫자를 가져옴
  const [winBalls, setWinBalls] = useState([]); // 선택된 숫자 모음
  const [bonus, setBonus] = useState(null); // 보너스 숫자
  const [redo, setRedo] = useState(false); // 재실행
  const [history, setHistory] = useState([]); // 기존에 뽑은 번호 목록 저장
  const [isRunning, setIsRunning] = useState(false); // 게임 진행 여부
  const timeouts = useRef([]);

  const startGame = useCallback(() => {
    if (isRunning) return; // 게임이 진행 중이면 클릭 막기
    setIsRunning(true); // 게임 시작하면 true로 변경

    const newNumbers = getWinNumbers();
    setWinNumbers(newNumbers);
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];

    for (let i = 0; i < newNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prev) => [...prev, newNumbers[i]]);
      }, (i + 1) * 1000);
    }

    timeouts.current[6] = setTimeout(() => {
      setBonus(newNumbers[6]);
      setRedo(true);
      setIsRunning(false); // 번호가 다 나오면 다시 실행 가능하도록 변경
      setHistory((prev) => [[...newNumbers], ...prev]); // 히스토리 저장
    }, 7000);
  }, [isRunning]);

  useEffect(() => {
    startGame(); // 자동 실행
    return () => {
      timeouts.current.forEach((v) => clearTimeout(v));
    };
  }, []);

  return (
    <div className="lotto-wrap">
      <div className="inner">
        <h2>Lotto Machine</h2>
        <button onClick={startGame} disabled={isRunning} className="redo">Redo</button>
        <div className="numbers">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div className="bonus">
          {!redo ? "" : <h2>Bonus</h2>}
          {bonus && <Ball key={bonus} number={bonus} />}
        </div>
        <div className="history">
          {redo && (
            <>
              <h2>History</h2>
              <ul className='history-box'>
                {history.map((numbers, index) => (
                  <li key={index}>{numbers.join(', ')}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LottoApp;
