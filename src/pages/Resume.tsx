import { getResumeContent } from '../utils/resume';
import MarkdownRenderer from '../components/MarkdownRenderer';
import './Resume.css';

export default function Resume() {
  const resumeContent = getResumeContent();

  return (
    <div className="resume">
      <div className="resume-container">
        <div className="resume-header">
          <a href="/Gabriel_Wang_Resume.pdf" download className="resume-download">
            Download PDF
          </a>
        </div>
        <MarkdownRenderer content={resumeContent} />
      </div>
    </div>
  );
}
