import React, { useEffect, useRef, useState } from 'react';
import styles from '../css/HorizontalScroll.module.css';

export default function HorizontalScroll({ children }) {

  const scrollRef =  useRef(null);
  const [isDrag, setIsDrag] = useState(false);
  const [start, setStart] = useState('');
  const [startPageX, setStartPageX] = useState();
  const [endPageX, setEndPageX] = useState();

  const onMouseDown = (event) => {
    event.preventDefault();
    setIsDrag(true);
    setStart(event.pageX + scrollRef.current.scrollLeft);
    setStartPageX(event.pageX);
  }

  const onMouseUp = (event) => {
    setEndPageX(event.pageX);
    setIsDrag(false);
  };

  const onDragMove = (event) => {
    if (isDrag) {
      scrollRef.current.scrollLeft = start - event.pageX;
    }
  };

  const onClick = (e) => {
    if (startPageX - endPageX !== 0) {
      e.preventDefault();
    }
  };

  return (
    <>
      <main>
        <div>
          <div className={styles.list}
            onMouseDown={onMouseDown}
            onMouseMove={isDrag ? onDragMove : null}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onClick={onClick}
            ref={scrollRef}>
              {children}
            </div>
        </div>
      </main>
    </>
  )
}