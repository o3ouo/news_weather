import React, { useState } from 'react';
import { useProductQuery } from './useProduct';
import { Link, useSearchParams } from 'react-router-dom';
import NewsItem from './NewsItem';

const NewsList = ({ category }) => {
  console.log(category);

  const { data, isLoading, isError, error } = useProductQuery(category);
  console.log(data);

  if (isLoading) return <h2 style={{margin: '16px auto'}}>Loading...</h2>
  if (isError) return <h2 style={{margin: '16px auto'}}>{error.message}</h2>

  const article = data || [];

  return (
    <div className="news-list">
      {/* 첫 번째 뉴스 아이템 */}
      {article.length > 0 && (
        <NewsItem key={article[0].article_id} article={article[0]} isFirst={true} />
      )}

      {/* 나머지 뉴스 아이템들 */}
      <div className="news-grid">
        {article.slice(1).map(article => (
            <NewsItem key={article.article_id} article={article}/>
          ))}
      </div>
    
    </div>
  );
}

export default NewsList;