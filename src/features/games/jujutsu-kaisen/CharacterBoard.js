import React, { useState, useEffect } from 'react';
import Character from "./Character";

function CharacterBoard({ gameRunning, setScore }) {
  const NUM_CHARACTERS = 12; // 등장 가능한 위치 개수
  const CHARACTER_APPEAR_CHANCE = 0.3; // 캐릭터 등장 확률

  const characterList = [
    { id: 1, img_url: "/img/gojo01.png", name: "gojo", score: 5 },
    { id: 2, img_url: "/img/yuta01.png", name: "yuta", score: 4 },
    { id: 3, img_url: "/img/toge01.png", name: "toge", score: 4 },
    { id: 4, img_url: "/img/maki01.png", name: "maki", score: 3 },
    { id: 5, img_url: "/img/panda01.png", name: "panda", score: 3 },
    { id: 6, img_url: "/img/yuji01.png", name: "yuji", score: 2 },
    { id: 7, img_url: "/img/megumi01.png", name: "megumi", score: 2 },
    { id: 8, img_url: "/img/nobara01.png", name: "nobara", score: 1 },
  ];

  // 캐릭터 상태 관리
  const [characters, setCharacters] = useState(Array(NUM_CHARACTERS).fill(null));

  // 랜덤 캐릭터를 선택하는 함수
  const getRandomCharacter = () => {
    return Math.random() < CHARACTER_APPEAR_CHANCE
      ? characterList[Math.floor(Math.random() * characterList.length)]
      : null;
  };
  
  // 게임이 진행 중일 때 캐릭터 등장 업데이트
  useEffect(() => {
    console.log("characters:",characters);

    if (!gameRunning) {
      setCharacters(Array(NUM_CHARACTERS).fill(null)); // 게임 종료 시 초기화
      return;
    }

    const characterInterval = setInterval(() => {
      setCharacters((prevState) => 
        prevState.map(() => getRandomCharacter()) // 각 칸에 랜덤 캐릭터 배치
      );
    }, 1000); // 1초마다 갱신

    return () => clearInterval(characterInterval);
  }, [gameRunning]);

  return (
    <div className="character-board">
      {characters.map((character, index) => (
        <div key={index} className="character-hole">
          {character && (
            <Character
              character={character} 
              onClick={() => {
                setScore(prev => prev + character.score);
                setCharacters((prevState) => 
                  prevState.map((char, i) =>
                  i === index ? null : char // 클릭된 칸을 null로 초기화
                )
              );
            }} 
           />
          )}
        </div>      
      ))}
    </div>
  );
}

export default CharacterBoard;
