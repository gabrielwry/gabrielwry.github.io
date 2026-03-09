import { getResumeContent } from '../utils/resume';
import MarkdownRenderer from '../components/MarkdownRenderer';
import './Resume.css';

export default function Resume() {
  const resumeContent = getResumeContent();

  return (
    <div className="resume">
      <div className="resume-container">
        <MarkdownRenderer content={resumeContent} />
      </div>
    </div>
  );
}
