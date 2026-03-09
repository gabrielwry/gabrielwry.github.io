import { useState } from 'react';
import { getAllProjects, getAllTechnologies } from '../utils/projects';
import './Projects.css';

export default function Projects() {
  const projects = getAllProjects();
  const allTechnologies = getAllTechnologies();
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = selectedTech
    ? projects.filter(p => p.technologies.includes(selectedTech))
    : projects;

  return (
    <div className="projects">
      <div className="projects-container">
        <header className="projects-header">
          <h1>Projects</h1>
          <p>Things I've built and worked on</p>
        </header>

        <div className="tech-filter">
          <button
            className={`tech-button ${!selectedTech ? 'active' : ''}`}
            onClick={() => setSelectedTech(null)}
          >
            All
          </button>
          {allTechnologies.map(tech => (
            <button
              key={tech}
              className={`tech-button ${selectedTech === tech ? 'active' : ''}`}
              onClick={() => setSelectedTech(tech)}
            >
              {tech}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="project-card">
              <div className="project-header">
                <h2>{project.title}</h2>
                <span className="project-date">{project.date}</span>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map(tech => (
                  <span key={tech} className="tech-tag">{tech}</span>
                ))}
              </div>
              {(project.link || project.github) && (
                <div className="project-links">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                      View Project →
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      GitHub →
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
