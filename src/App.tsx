import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Resume from './pages/Resume';
import Writings from './pages/Writings';
import Projects from './pages/Projects';
import Photos from './pages/Photos';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/writings" element={<Writings />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/photos" element={<Photos />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
