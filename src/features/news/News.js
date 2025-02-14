import React, { useState, useCallback } from 'react';
import '../../css/News.css';
import NewsCategory from './NewsCategory';
import NewsList from './NewsList';

function News() {
  const [category, setCategory ] = useState("all");

  // 카테고리가 변경될 때 실행되는 함수
  const onSelect = useCallback((category) => setCategory(category), []);

  return (
    <div className="news-wrap">
      <NewsCategory onSelect={onSelect}/>
      <NewsList category={category}/>
    </div>
  );
}

export default News;
