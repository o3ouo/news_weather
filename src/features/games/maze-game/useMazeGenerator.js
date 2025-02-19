import { useState, useEffect } from "react";

// 이동 방향 정의
const DIRECTIONS = [
  { x: 0, y: -2 }, // 위
  { x: 0, y: 2 }, // 아래
  { x: -2, y: 0 }, // 왼쪽
  { x: 2, y: 0 }, // 오른쪽
];

// 경로 확인 로직 (BFS)
const isPathExists = (maze, start, end) => {
  const queue = [[start.x, start.y]]; // 시작 위치
  const visited = new Set();
  visited.add(`${start.x},${start.y}`);

  while (queue.length) {
    const [x, y] = queue.shift();
    if (x === end.x && y === end.y) return true; // 출구 도착 확인

    for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
      const nx = x + dx, ny = y + dy;

      // 출구 ("E")도 탐색 가능
      if (maze[ny]?.[nx] === 0 || maze[ny]?.[nx] === "E") {
        const key = `${nx},${ny}`;
        if (!visited.has(key)) {
          queue.push([nx, ny]);
          visited.add(key);
        }
      }
    }
  }
  return false; // 출구에 도달할 수 없음
};

// DFS + 경로 보장
// 랜덤 미로 생성 함수, row와 cols는 미로의 크기를 결정하는 값
const generateMaze = (rows, cols, difficulty) => {
  rows = Math.max(rows, 5);
  cols = Math.max(cols, 5);
  // 미로를 row * cols 크기의 2차원 배열로 만들고 모든 칸을 1(벽)으로 채움
  const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

  // x, y가 미로의 바깥으로 벗어나지 않는지 확인하는 함수
  const inBounds = (x, y) => x > 0 && y > 0 && x < cols - 1 && y < rows - 1;

  // 길을 뚫는 재귀 함수
  const carvePath = (x, y) => {
    maze[y][x] = 0; // 현재 위치를 길(0)로 변경
    for (const { x: dx, y: dy } of [...DIRECTIONS].sort(() => Math.random() - 0.5)) {
      // 다음 위치, step 크기에 맞게 이동 거리 조정 
      const nx = x + dx, ny = y + dy, mx = x + dx / 2, my = y + dy / 2; // 중간 위치
      // 이동 가능한지 확인
      if (inBounds(nx, ny) && maze[ny][nx] === 1) { // 미로 바깥이 아니고 벽(1)이면 길을 뚫음
        maze[my][mx] = 0; // 중간 벽 제거
        maze[ny][nx] = 0; // 최종 위치 뚫기
        carvePath(nx, ny); // 다음 위치로 이동 (재귀 호출)
      }
    }
  };

  carvePath(1, 1); // 시작점에서 길 뚫기 시작, 실행하면 maze배열이 길과 벽으로 나위어진 미로가 됨
  maze[rows - 2][cols - 2] = "E"; // 진짜 출구 위치

  // 가짜 출구 추가
  for (let i = 0; i < difficulty; i++) {
    let exitX, exitY;
    do {
      exitX = Math.floor(Math.random() * (cols - 2)) + 1;
      exitY = Math.floor(Math.random() * (rows - 2)) + 1;
    } while (maze[exitY][exitX] !== 0); // 벽이 아닌 위치만 선택
    maze[exitY][exitX] = "F";
  }

  return maze; // 최종적으로 미로 배열 반환
}

// 출구까지 가는 길 강제 연결
const ensurePathExists = (maze, rows, cols) => {
  const start = { x: 1, y: 1 }, end = { x: cols - 2, y: rows - 2 };
  const queue = [[start.x, start.y]], visited = new Set([`${start.x},${start.y}`]);

  while (queue.length) {
    const [x, y] = queue.shift();
    if (x === end.x && y === end.y) return maze; // 출구까지 도달했으면 종료
    for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
      const nx = x + dx, ny = y + dy;
      // 방문하지 않은 벽(1)만 길로 변경
      if (maze[ny]?.[nx] === 1 && !visited.has(`${nx},${ny}`)) {
        queue.push([nx, ny]);
        visited.add(`${nx},${ny}`); // 방문 기록 추가
        maze[ny][nx] = 0; // 경로가 보장되도록 벽 제거
      }
    }
  }
  return maze;
};

// 커스텀 훅: 미로 생성 및 상태 관리
export default function useMazeGenerator(rows, cols, difficulty) {
  const [maze, setMaze] = useState([]);

  // useEffect를 사용해서 rows 또는 cols가 변경될 때마다 새로운 미로를 생성
  useEffect(() => {
    let newMaze;
    let attempts = 0, MAX_ATTEMPTS = 50; // 최대 시도 횟수
    // 플레이어 시작 위치 
    const start = { x: 1, y: 1 }, end = { x: cols - 2, y: rows - 2 }; // 출구 위치

    do {
      newMaze = generateMaze(rows, cols, difficulty); // 기존 미로 생성 함수 호출
      newMaze = ensurePathExists(newMaze, rows, cols); // 출구까지 길 보장
      attempts++;

      if (attempts >= MAX_ATTEMPTS) {
        console.warn("최대 시도 횟수를 초과하여 미로 생성 중단");
        break; // 무한 루프 방지
      }
    } while (newMaze.length === 0 || !isPathExists(newMaze, start, end)); // 출구까지 길이 없으면 다시 생성    

    console.log("최종 미로: ", newMaze); // 디버깅용 로그
    if (newMaze.length < 0) setMaze(newMaze); // 미로가 생성된 경우에만 업데이트
  }, [rows, cols, difficulty]);
}