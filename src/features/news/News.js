import React, { useState, useCallback } from 'react';
import '../../css/News.css';
import NewsCategory from './NewsCategory';
import NewsList from './NewsList';

function News() {
  const [category, setCategory ] = useState("all");
  const [currentTab, setCurrentTab] = useState(0);

  // 카테고리가 변경될 때 실행되는 함수
  const onSelect = useCallback((category, index) => {
    setCategory(category);
    setCurrentTab(index);
  }, []);

  return (
    <div className="news-wrap">
      <NewsCategory onSelect={onSelect} currentTab={currentTab}/>
      <div className="line"></div>
      <NewsList category={category}/>
    </div>
  );
}

export default News;
