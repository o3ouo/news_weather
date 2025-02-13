import React, { useState, useEffect } from 'react';
import '../css/Header.css';

function Header() {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      // 현재 날짜, 시간 가져오기
      const date = new Date();

      // padSart() : String 값의 메서드로, 결과 문자열이 주어진 길이에 도달할 때까지 이 문자열의 시작 부분에 다른 문자열을 (필요하다면 여러 번)채운다. 패딩은 이 문자열의 시작 부분부터 적용된다. 

      // 연도, 월(0부터 시작하므로 +1), 일
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      // 시간, 분, 초
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");

      setDateTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
    };

    // 1초마다 updateDateTime 실행
    const timerId = setInterval(updateDateTime, 1000);

    // 컴포넌트가 마운트될 때 즉시 한 번 실행 (setInterval은 1초 뒤부터 실행되므로 즉시 한 번 실행)
    updateDateTime();

    // 언마운트 시 타이머 정리
    return () => clearInterval(timerId);
  }, []);

  return (
    <header>
      <div className="inner">
        <div className="left">
          <h1 className='title'>PlayPress</h1>
          <div className="day">
            <p className='m-title'>MONDAY</p>
            <div className="m-data">{dateTime}</div>
          </div>
        </div>
        <div className="right">
          <p className="text">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita error accusantium facere voluptas quos, dolore obcaecati officia blanditiis veniam quisquam. Eligendi cumque repellendus facere consequuntur vitae distinctio ad quisquam dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita error accusantium facere voluptas quos, dolore
          </p>
          <p className="symbols">
            ⠁⠇⠇ ⠓⠥⠍⠁⠝ ⠃⠑⠊⠝⠛⠎ ⠁⠗⠑ ⠃⠕⠗⠝
          </p>
          <p className="barcode">
            PlayPress
          </p>
        </div>
      </div>

      <div className="line"></div>
      <div className="line"></div>
    </header>
  );
}

export default Header;