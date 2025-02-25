import React, { useState } from 'react';

function SearchBar({ setCity }) {
  const [input, setInput] =useState('');

  // 엔터키 입력 시 setCity 호출
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      // 한글을 URL 인코딩하여 전달
      const encodedCity = encodeURIComponent(input.trim());
      setCity(encodedCity);
      setInput('');
    }
  };

  return (
    <div className="search-bar">
      {/* 입력 시 setCity를 업데이트 */}
      <figure className="search-icon">
        <img src="/icon/search.png" alt="search-icon" />
      </figure>
      <input 
        type="text" 
        placeholder="Enter city name"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBar;
