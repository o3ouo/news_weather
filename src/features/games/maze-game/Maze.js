import React, { useState, useEffect, useCallback } from "react";
import Player from "./Player";
import useMazeGenerator from "./useMazeGenerator";
import useWindowDimensions from "../../../customHook/useWindowDimensions";



// 현재 스테이지 정보와 플레이어가 출구에 도착하면 실행할 함수를 props로 받아옴
export default function Maze({ stage, onWin }) {
  // 디바이스 사이즈
  const { width } = useWindowDimensions();
  const mobile = width <= 480;

  // 스테이지 제한
  const limitedStage = stage < 5;

  const rows = 11 + stage * 2;
  const cols = limitedStage ? (11 + stage * 2) : 19;
  const sizeStyle = limitedStage ? `${35 - (stage * 4)}px` : "21px";
  const mediaStyle = mobile ? "15px" : sizeStyle; 

  // 호출해 랜덤 미로 생성
  const maze = useMazeGenerator(rows, cols); 

  
  // 플레어어의 현재 위치를 (1, 1)에서 시작하도록 설정
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });

  useEffect(() => {
    setPlayerPos({ x: 1, y: 1 }); // 새로운 미로가 생성되면 플레이어 위치 초기화
  }, [maze]); 

  // 플레이어 이동
  const handleMove = useCallback((dx, dy) => {
    // 현재 플레이어 위치 가져오기
    setPlayerPos((prevPos) => {
      const newX = prevPos.x + dx, newY = prevPos.y + dy; // dx, dy 방향으로 이동할 위치 계산
    
      // 이동할 위치가 벽(1)이 아니면 이동 가능
      if (maze[newY]?.[newX] === 0 || maze[newY]?.[newX] === "E") {  
        // 이동한 위치가 출구(E)라면 onWin() 호출
        if (maze[newY][newX] === "E") {
          onWin();
        }
        return { x: newX, y: newY };
      }
      return prevPos; // 벽이면 이동하지 않음 
    });
  }, [maze, onWin]);

  // 키보드 입력 감지해서 handleMove 호출
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
  }, [playerPos]);

  return (
    <div className="maze">
      {maze.map((row, y) => (
        <div key={y} className="maze-row">
          {row.map((cell, x) => (
            <div key={x} className={`maze-cell ${cell === 1 ? "wall" : ""} ${cell === "E" ? "exit" : ""}`} style={{width: mediaStyle, height: mediaStyle}}>
              {playerPos.x === x && playerPos.y === y && <Player />}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
