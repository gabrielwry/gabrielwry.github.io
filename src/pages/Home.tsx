import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <h1 className="home-title">
          Hi, I'm <span className="highlight">Gabriel Wang</span>
        </h1>
        <p className="home-subtitle">
          Software Engineer · Data Enthusiast · Writer
        </p>
        <p className="home-description">
          I build elegant solutions to complex problems and document my journey through code and words.
        </p>
        <div className="home-links">
          <a href="https://github.com/gabrielwry" target="_blank" rel="noopener noreferrer" className="home-link">
            GitHub
          </a>
          <a href="https://linkedin.com/in/gabrielwang" target="_blank" rel="noopener noreferrer" className="home-link">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
