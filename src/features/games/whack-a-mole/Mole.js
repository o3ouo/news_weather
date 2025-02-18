import React from 'react';

function Mole({ isMole, onWhack}) {
  return (
    <div className={`mole-hole ${isMole ? "mole" : ""}`} onClick={isMole ? onWhack : null}>
      {isMole && <div className="mole-character">🐹</div>}
    </div>
  );
}

export default Mole;
