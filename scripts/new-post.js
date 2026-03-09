#!/usr/bin/env node

/**
 * Helper script to create new writing posts
 * Usage: node scripts/new-post.js "My Post Title"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const title = args[0];

if (!title) {
  console.error('❌ Please provide a title: node scripts/new-post.js "Your Title"');
  process.exit(1);
}

// Generate slug from title
const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

// Get current date
const date = new Date().toISOString().split('T')[0];

// Create filename
const filename = `${date}-${slug}.md`;
const filepath = path.join(__dirname, '..', 'data', 'writings', filename);

// Check if file already exists
if (fs.existsSync(filepath)) {
  console.error(`❌ File already exists: ${filename}`);
  process.exit(1);
}

// Template content
const template = `---
title: "${title}"
date: "${date}"
tags: ["tag1", "tag2", "tag3"]
excerpt: "A brief description of your post..."
---

# ${title}

Start writing your post here...

## Section 1

Your content...

## Section 2

More content...
`;

// Write file
fs.writeFileSync(filepath, template, 'utf-8');

console.log('✅ Created new post:');
console.log(`   ${filename}`);
console.log(`\n📝 Edit: data/writings/${filename}`);
console.log(`\n💡 Don't forget to:`);
console.log(`   1. Update the tags array`);
console.log(`   2. Write a compelling excerpt`);
console.log(`   3. Add your content`);
