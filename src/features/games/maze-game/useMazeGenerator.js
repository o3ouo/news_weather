import { useState, useEffect } from "react";

// 미로 생성 시 사용할 이동 방향
const DIRECTIONS = [
  { x: 0, y: -2 }, // 위
  { x: 0, y: 2 },  // 아래
  { x: -2, y: 0 }, // 왼쪽
  { x: 2, y: 0 }   // 오른쪽
];

// 랜덤 미로 생성 함수, rows와 cols는 미로의 크기를 결정하는 값
function generateMaze(rows, cols) {
  // rows * cols 크기의 2차원 배열을 만들고, 모든 셀을 1(벽)으로 채움
  const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

  // 미로 바깥으로 나가지 않도록 좌표 제한
  const inBounds = (x, y) => x > 0 && y > 0 && x < cols - 1 && y < rows - 1;

  // 벽을 제거하면서 길을 생성하는 재귀 함수
  const carvePath = (x, y) => {
    maze[y][x] = 0; // 현재 위치를 0(길)로 변경

    // DIRECTIONS 배열을 랜덤으로 섞어, 미로가 매번 다르게 생성됨
    const directions = [...DIRECTIONS].sort(() => Math.random() - 0.5);
    
    // 반복문으로 길 뚫기 시도
    for (let { x: dx, y: dy } of directions) { // dx, dy는 이동 방향
      // 다음 좌표, step 크기에 맞게 조정
      const nx = x + dx; 
      const ny = y + dy;
      // nx, ny가 미로 바깥이 아니고, 아직 벽(1)이면 실행
      if (inBounds(nx, ny) && maze[ny][nx] === 1) { 
        maze[ny - dy / 2][nx - dx / 2] = 0; // 최종 위치 뚫기
        carvePath(nx, ny); // 다음 위치로 재귀 호출
      }
    }
  };

  // 시작점에서 길 뚫기 시작, 실행하면 maze 배열이 길과 벽으로 나뉘어진 미로가 됨
  carvePath(1, 1); 
  maze[rows - 2][cols - 2] = "E"; // 출구 위치 (항상 미로의 오른쪽 아래 모서리에 배치)
  return maze; // 최종적으로 완성된 미로를 반환
}

// 커스텀 훅: 미로 생성 및 상태 관리, rows, cols 크기의 랜덤 미로 생성
export default function useMazeGenerator(rows, cols) {
  const [maze, setMaze] = useState([]);

  // useEffect가 실행되면서 
  useEffect(() => {
    // generateMaze를 호출하고 그 결과를 setMaze()를 통해 maze 상태에 저장
    setMaze(generateMaze(rows, cols)); 
  }, [rows, cols]); // rows, cols가 변경될 떄마다 새로운 미로 생성

  return maze;
}
