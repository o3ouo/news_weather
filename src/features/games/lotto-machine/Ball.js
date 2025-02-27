import React, { useMemo } from 'react';

function Ball({ number }) {
  let background;
  
  if (number < 10) {
    background = '#F15BB5';
  } else if (number < 20) {
    background = '#FEE440';
  } else if (number < 30) {
    background = '#00F5D4';
  } else if (number < 40) {
    background = '#00BBF9';
  } else {
    background = '#9B5DE5';
  }

  return (
    <div className="ball" style={{ backgroundColor: background }}>
      {number}
    </div>
  );
}

export default Ball;
