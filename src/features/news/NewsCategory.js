import React from 'react';


function NewsCategory({ onSelect }) {
  const categories = [
    { id: 1, name:'all', text: 'ALL' },
    { id: 2, name:'top', text: 'TOP' },
    { id: 3, name:'sports', text: 'SPORTS' },
    { id: 4, name:'technology', text: 'TECHNOLOGY' },
    { id: 5, name:'business', text: 'BUSINESS' },
    { id: 6, name:'science', text: 'SCIENCE' },
    { id: 7, name:'entertainment', text: 'ENTERTAINMENT' },
    { id: 8, name:'health', text: 'HEALTH' },
    { id: 9, name:'world', text: 'WORLD' },
    { id: 10, name:'politics', text: 'POLITICE' },
    { id: 11, name:'environment', text: 'ENVIRONMENT' },
  ];
  
  return (
    <nav className="news-caterogy">
      {
        categories.map(item => (
          <button 
            type="button" 
            key={item.id}
            onClick={() => onSelect(item.name)}
            className={item.name}
          >
            {item.text}
          </button>
        ))
      }
    </nav>
  );
}

export default NewsCategory;
