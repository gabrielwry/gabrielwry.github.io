import matter from 'gray-matter';

export interface WritingMetadata {
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export interface Writing {
  slug: string;
  metadata: WritingMetadata;
  content: string;
}

// Simple frontmatter parser that works in the browser
function parseFrontmatter(content: string): { data: any; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }

  const [, frontmatter, markdownContent] = match;
  const data: any = {};

  // Parse YAML-like frontmatter
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes
    value = value.replace(/^["']|["']$/g, '');

    // Parse arrays (tags)
    if (value.startsWith('[') && value.endsWith(']')) {
      data[key] = value
        .slice(1, -1)
        .split(',')
        .map(item => item.trim().replace(/^["']|["']$/g, ''));
    } else {
      data[key] = value;
    }
  });

  return { data, content: markdownContent };
}

// Import all markdown files from data/writings
const writingFiles = import.meta.glob('../../data/writings/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllWritings(): Writing[] {
  const writings: Writing[] = [];

  for (const [path, content] of Object.entries(writingFiles)) {
    const { data, content: markdownContent } = parseFrontmatter(content as string);
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    writings.push({
      slug,
      metadata: {
        title: data.title || 'Untitled',
        date: data.date || '',
        tags: data.tags || [],
        excerpt: data.excerpt || '',
      },
      content: markdownContent,
    });
  }

  // Sort by date (newest first)
  return writings.sort((a, b) => 
    new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
}

export function getWritingBySlug(slug: string): Writing | undefined {
  const writings = getAllWritings();
  return writings.find(w => w.slug === slug);
}

export function getAllTags(): string[] {
  const writings = getAllWritings();
  const tagSet = new Set<string>();
  
  writings.forEach(writing => {
    writing.metadata.tags.forEach(tag => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

export function getWritingsByTag(tag: string): Writing[] {
  const writings = getAllWritings();
  return writings.filter(writing => 
    writing.metadata.tags.includes(tag)
  );
}
