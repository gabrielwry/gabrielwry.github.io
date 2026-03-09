import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Gabriel Wang
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/resume" className={isActive('/resume') ? 'active' : ''}>
              Resume
            </Link>
          </li>
          <li>
            <Link to="/writings" className={isActive('/writings') ? 'active' : ''}>
              Writings
            </Link>
          </li>
          <li>
            <Link to="/projects" className={isActive('/projects') ? 'active' : ''}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/photos" className={isActive('/photos') ? 'active' : ''}>
              Photos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
