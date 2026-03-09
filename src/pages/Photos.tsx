import { useState } from 'react';
import { getAllPhotos, getAllPhotoTags } from '../utils/photos';
import './Photos.css';

export default function Photos() {
  const photos = getAllPhotos();
  const allTags = getAllPhotoTags();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPhotos = selectedTag
    ? photos.filter(p => p.tags.includes(selectedTag))
    : photos;

  return (
    <div className="photos">
      <div className="photos-container">
        <header className="photos-header">
          <h1>Photo Portfolio</h1>
          <p>Capturing moments and perspectives</p>
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

        <div className="photos-grid">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="photo-card">
              <img src={photo.url} alt={photo.title} loading="lazy" />
              <div className="photo-overlay">
                <h3>{photo.title}</h3>
                <p>{photo.location}</p>
                <div className="photo-tags">
                  {photo.tags.map(tag => (
                    <span key={tag} className="photo-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
