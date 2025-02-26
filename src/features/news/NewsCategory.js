import React from 'react';
import HorizontalScroll from '../../components/HorizontalScroll';


function NewsCategory({ onSelect, currentTab }) {
  const categories = [
    { id: 0, name: 'all', text: 'ALL' },
    { id: 1, name: 'top', text: 'TOP' },
    { id: 2, name: 'sports', text: 'SPORTS' },
    { id: 3, name: 'technology', text: 'TECHNOLOGY' },
    { id: 4, name: 'business', text: 'BUSINESS' },
    { id: 5, name: 'science', text: 'SCIENCE' },
    { id: 6, name: 'entertainment', text: 'ENTERTAINMENT' },
    { id: 7, name: 'health', text: 'HEALTH' },
    { id: 8, name: 'world', text: 'WORLD' },
    { id: 9, name: 'politics', text: 'POLITICE' },
    { id: 10, name: 'environment', text: 'ENVIRONMENT' },
  ];

  return (
    <HorizontalScroll>
      <nav className="news-category">
        {
          categories.map(item => (
            <button
              type="button"
              key={item.id}
              onClick={() => onSelect(item.name, item.id)}
              className={currentTab === item.id ? "on" : ""}
            >
              {item.text}
            </button>
          ))
        }
      </nav>
    </HorizontalScroll>


  );
}

export default NewsCategory;
