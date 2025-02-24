import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/MediaNav.css';

function MediaNav() {
  const [currentTab, setCurrentTab] = useState(0);

  const tabButton = [
    { link: '/', name: 'News' },
    { link: '/weater', name: 'Weather' },
    { link: '/games', name: 'Mini game' },
  ];

  const selectTab = (index) => {
    setCurrentTab(index);
  };
  return (
    <nav className="media-nav">
      <ul>
        {tabButton.map((tab, index) => (
          <li
            key={index}
            className={currentTab === index ? "on" : ""}
            onClick={() => selectTab(index)}
          >
            <Link to={tab.link}>{tab.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MediaNav;
