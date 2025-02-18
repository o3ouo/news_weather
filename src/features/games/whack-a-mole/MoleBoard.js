import React, { useState, useEffect } from 'react';
import Mole from "./Mole";

function MoleBoard({ gameRunning, setScore }) {
  const numMoles = 9; // 3 * 3 두더지 구멍
  const [moles, setMoles] = useState(Array(numMoles).fill(false));

  // 게임이 실행될 때 두더지가 랜덤으로 등장하도록 설정
  useEffect(() => {
    if (gameRunning) {
      const moleInterval = setInterval(() => {
        let newMoles = Array(numMoles).fill(false);
        const randomIndex = Math.floor(Math.random() * numMoles);
        newMoles[randomIndex] = true;
        setMoles(newMoles);
      }, 800); // 0.8초마다 두더지 변경
      return () => clearInterval(moleInterval);
    } else {
      setMoles(Array(numMoles).fill(false)); // 게임 종료 시 모든 두더지 제거
    }
  }, [gameRunning]);

  return (
    <div className="mole-board">
      {moles.map((isMole, index) => (
        <Mole key={index} isMole={isMole} onWhack={() => setScore((prev) => prev + 1)}/>
      ))}
    </div>
  );
}

export default MoleBoard;
