import { useState } from 'react';
import { getAllWritings, getAllTags } from '../utils/writings';
import './Writings.css';

export default function Writings() {
  const writings = getAllWritings();
  const allTags = getAllTags();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredWritings = selectedTag
    ? writings.filter(w => w.metadata.tags.includes(selectedTag))
    : writings;

  return (
    <div className="writings">
      <div className="writings-container">
        <header className="writings-header">
          <h1>Writings</h1>
          <p>Thoughts on engineering, data, and life</p>
        </header>

        <div className="tags-filter">
          <button
            className={`tag-button ${!selectedTag ? 'active' : ''}`}
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`tag-button ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="writings-grid">
          {filteredWritings.map((writing) => (
            <article key={writing.slug} className="writing-card">
              <div className="writing-tags">
                {writing.metadata.tags.map(tag => (
                  <span key={tag} className="writing-tag">{tag}</span>
                ))}
              </div>
              <h2>{writing.metadata.title}</h2>
              <p className="writing-date">
                {new Date(writing.metadata.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="writing-excerpt">{writing.metadata.excerpt}</p>
              <a href={`#${writing.slug}`} className="writing-link">Read more →</a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
