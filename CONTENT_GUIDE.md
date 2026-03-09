# Content Management Guide

## 📁 Folder Structure

```
/data
  /writings/       # Blog posts and articles (markdown)
  /photos/         # Photo portfolio data (JSON)
  /resume/         # Your resume (markdown)
```

## ✍️ Managing Writings

### Creating a New Post

1. Create a new markdown file in `/data/writings/`
2. Use the format: `YYYY-MM-DD-title.md`
3. Add frontmatter at the top:

```markdown
---
title: "Your Amazing Post Title"
date: "2026-02-16"
tags: ["engineering", "tutorial", "react"]
excerpt: "A brief summary that appears on the card..."
---

# Your Amazing Post Title

Write your content here using markdown...
```

### Frontmatter Fields

- **title** (required): Display title of your post
- **date** (required): Publication date in YYYY-MM-DD format
- **tags** (required): Array of tags for filtering
- **excerpt** (required): Short description for the card preview

### Tags

Tags are automatically:
- Extracted from the `tags` array in frontmatter
- Displayed as filter buttons on the Writings page
- Used for filtering content

**Tip:** Keep tags lowercase and use common categories like:
- `engineering`, `tutorial`, `interview`
- `data-engineering`, `distributed-systems`
- `life`, `reflection`, `book-notes`

## 📸 Managing Photos

Edit `/data/photos/photos.json` to add or remove photos:

```json
[
  {
    "id": 1,
    "title": "Photo Title",
    "location": "City, State",
    "url": "https://your-image-url.com/photo.jpg",
    "description": "Detailed description",
    "date": "2024-08-15",
    "tags": ["nature", "sunset", "landscape"]
  }
]
```

### Photo Fields

- **id**: Unique number (increment for each new photo)
- **title**: Display title
- **location**: Where the photo was taken
- **url**: Direct link to the image (can be hosted on Unsplash, Imgur, etc.)
- **description**: Detailed description (shown on hover)
- **date**: When the photo was taken
- **tags**: Array of tags for filtering

## 📄 Updating Resume

Edit `/data/resume/resume.md` directly in markdown:

```markdown
# Your Name

**Your Title**

email@example.com | [LinkedIn](url) | [GitHub](url)

---

## Summary

Your professional summary...

---

## Experience

### Job Title
**Company Name** | 2020 - Present

- Achievement or responsibility
- Another achievement
- Technologies: Python, React, AWS
```

**Tip:** Use standard markdown formatting:
- `#` for main heading (your name)
- `##` for sections (Experience, Education, Skills)
- `###` for subsections (job titles)
- Lists for bullet points
- `**bold**` for emphasis

## 🎨 Markdown Tips

### Supported Formatting

- **Headings**: `#`, `##`, `###`, etc.
- **Bold**: `**text**`
- **Italic**: `*text*`
- **Links**: `[text](url)`
- **Lists**: `-` or `1.`
- **Code**: `` `inline` `` or ` ```language ` for blocks
- **Quotes**: `> quote text`
- **Tables**: GitHub Flavored Markdown tables
- **Horizontal Rule**: `---`

### Code Blocks

\`\`\`python
def hello():
    print("Hello, world!")
\`\`\`

### Tables

```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

## 🔄 Publishing Changes

1. Edit the markdown or JSON files in `/data`
2. Save your changes
3. Commit and push to GitHub:
   ```bash
   git add data/
   git commit -m "Updated writings/photos/resume"
   git push
   ```
4. GitHub Actions will automatically rebuild and deploy your site

## ⚡ Quick Tips

- **Keep it simple**: Don't overcomplicate your markdown
- **Consistent tags**: Reuse existing tags when possible
- **Image hosting**: Use reliable services like Unsplash, Imgur, or your own CDN
- **Preview locally**: Run `npm run dev` to preview changes before pushing
- **Backup**: Keep backups of your content files
