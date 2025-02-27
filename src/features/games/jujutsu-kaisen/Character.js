import React from 'react';

function Character({ character, onClick}) {
  return (
    <div className="character-image" onClick={onClick}>
      {character ? (
        <img 
          className={`character ${character.name}`}  
          src={`${process.env.PUBLIC_URL}${character.img_url}`}
          alt={character.name}
        />
      ) : null}
       {/* character가 null일 경우 img 렌더링 안 함  */}
  
    </div>
  );
}

export default Character;
