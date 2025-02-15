import React from 'react';
import defaultImage from '../../img/alt.jpg'; // 기본 이미지 설정

function NewsItem({ article, isFirst }) {
  const { title, image_url, description, link } = article;

  // 이미지 URL이 없거나 유효하지 않으면 기본 이미지 사용
  const imageSrc = image_url ? image_url : defaultImage;

  return (
    <article className={`news-item ${isFirst ? 'news-item-first' : ''}`}>
        <a href={link} target='_blank' className="inner">
          <h2>{title}</h2>
          <figure className="news-img">
            <img src={imageSrc}  alt={title} />
          </figure>
          <p className="news-text">{description}</p>
        </a>
    </article>
  );
}

export default NewsItem;
