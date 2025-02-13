import { h2 } from 'framer-motion/client';
import React from 'react';

function NewsItem({ article, isFirst }) {
  const { title, image_url, description, link } = article;

  return (
    <article className={`news-item ${isFirst ? 'news-item-first' : ''}`}>
        <a href={link} target='_blank' className="inner">
          <h2>{title}</h2>
          <figure className="news-img">
            <img src={image_url} alt={title} />
          </figure>
          <p className="news-text">{description}</p>
        </a>
    </article>
  );
}

export default NewsItem;
