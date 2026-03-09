export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string | null;
  github: string | null;
  date: string;
}

const projectsData = import.meta.glob('../../data/projects/projects.json', { import: 'default', eager: true });

export function getAllProjects(): Project[] {
  const data = Object.values(projectsData)[0] as Project[];
  return data || [];
}

export function getAllTechnologies(): string[] {
  const projects = getAllProjects();
  const techSet = new Set<string>();
  projects.forEach(project => {
    project.technologies.forEach(tech => techSet.add(tech));
  });
  return Array.from(techSet).sort();
}

export function getProjectsByTechnology(tech: string): Project[] {
  const projects = getAllProjects();
  return projects.filter(project => project.technologies.includes(tech));
}
