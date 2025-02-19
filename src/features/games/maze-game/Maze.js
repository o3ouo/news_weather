import React, { useState, useEffect, useCallback } from "react";
import Player from "./Player";
import useMazeGenerator from "./useMazeGenerator"; // 미로 생성 커스텀 훅

// 현재 스테이지 정보, 플레이어가 출구에 도착하면 실행할 함수를 props로 받아옴
export default function Maze({ stage, onWin }) { 
  // 미로 크기
  const rows = 20;
  const cols = 11;
  const difficulty = stage; // 스테이지에 따라 난이도 증가
  const maze = useMazeGenerator(rows, cols, difficulty); // 호출해 랜덤 미로 생성

  // 플레이어의 현재 위치를 (1, 1)에서 시작하도록 설정
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1}); 

  // 미로가 새롭게 생성되면 플레이어 위치를 초기화
  useEffect(() => {
    setPlayerPos({ x: 1, y: 1 }); // 새로운 미로가 생성되면 플레이어 위치 초기화
  }, [rows, cols]);

  // 플레이어 이동 처리
  const handleMove = useCallback((dx, dy) => {
    setPlayerPos((prevPos) => {
      const newX = prevPos.x + dx;
      const newY = prevPos.y + dy; // 이동할 위치 계산

      if (maze[newY]?.[newX] === 0 || maze[newY]?.[newX] === "E") {
        if (maze[newY][newX] === "E") { // 출구에 도달하면 onWin() 호출
          onWin();
        }
        return { x: newX, y: newY }; // 플레이어 위치 업데이트
      }
      return prevPos; // 벽(1)이면 이동하지 않음
    });
  }, [maze, onWin]);

  // 키보드 입력을 감지해서 handleMove 호출
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault(); // 기본 스크롤 방지
      }

      if (e.key === "ArrowUp") handleMove(0, -1);
      if (e.key === "ArrowDown") handleMove(0, 1);
      if (e.key === "ArrowLeft") handleMove(-1, 0);
      if (e.key === "ArrowRight") handleMove(1, 0);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleMove]);

  return ( // maze를 화면에 출력하고, 플레이어 위치를 표시
    <div className="maze">
      {maze.map((row, y) => (
        <div key={y} className="maze-row">
          {row.map((cell, x) => (
            <div 
              key={x}
              className={`maze-cell ${cell === 1 ? "wall" : ""} ${cell === "E" ? "exit" : ""} ${cell === "F" ? "fake-exit" : ""}`}
            >
              {playerPos.x === x && playerPos.y === y && <Player />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}