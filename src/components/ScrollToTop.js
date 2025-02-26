import React, { useState, useEffect, useCallback } from 'react';
import { BsArrowUpSquareFill } from "react-icons/bs";
import styles from '../css/ScrollToTop.module.css';

function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  // 최상단으로 스크롤 이동 함수
  const handleScroll = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  // 버튼 표시 여부 결정
  useEffect(() => {
    const handleShowButton = () => {
      setShowButton(window.scrollY > window.innerHeight);
      };

    window.addEventListener("scroll", handleShowButton)

    return () => {
      window.removeEventListener("scroll", handleShowButton)
    };
  }, []);

  return (
    <div className={styles.topBtn_wrap}>
      {showButton && (
        <button className={styles.topBtn} onClick={handleScroll}>
          <BsArrowUpSquareFill />
        </button>
      )}
    </div>
  )
}

export default ScrollToTop;
