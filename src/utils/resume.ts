// Import resume markdown
const resumeFile = import.meta.glob('../../data/resume/resume.md', { query: '?raw', import: 'default', eager: true });

export function getResumeContent(): string {
  console.log('resumeFile:', resumeFile);
  console.log('resumeFile entries:', Object.entries(resumeFile));
  const content = Object.values(resumeFile)[0] as string;
  console.log('Resume content length:', content?.length);
  return content || '';
}
