# Blog Workflow Guide - Using Your Separate Blogs Repository

## Overview
You have two GitHub repositories:
1. **Main Landing Page**: `ethereal-blog-landing` (this repository)
2. **Blog Posts Repository**: `Blogs.github.io` (https://github.com/BillLayne/Blogs.github.io)

## How to Add a New Blog Post

### Step 1: Create Your Blog Post in the Blogs Repository
1. Go to your Blogs repository: https://github.com/BillLayne/Blogs.github.io
2. Copy the `blog-template.html` from your landing page repository
3. Create a new file with a descriptive name (e.g., `understanding-home-insurance.html`)
4. Edit the content, replacing all `[placeholder]` text

### Step 2: Update Your Landing Page
1. In your landing page repository, open `data/blogs.json`
2. Add a new entry for your blog post:

```json
{
    "id": "2025-01-home-insurance",
    "title": "Understanding Home Insurance Coverage",
    "excerpt": "Learn the essential components of home insurance and how to ensure you have adequate coverage...",
    "date": "2025-01-15",
    "category": "Home Insurance",
    "link": "https://billlayne.github.io/Blogs.github.io/understanding-home-insurance.html",
    "featured": false
}
```

### Step 3: Commit and Push Both Repositories
1. **In your Blogs repository**:
   ```bash
   git add understanding-home-insurance.html
   git commit -m "Add new blog post: Understanding Home Insurance"
   git push
   ```

2. **In your landing page repository**:
   ```bash
   git add data/blogs.json
   git commit -m "Add link to new blog post: Understanding Home Insurance"
   git push
   ```

## File Structure

### Landing Page Repository (ethereal-blog-landing)
```
/
├── index.html                 # Your main landing page
├── data/
│   └── blogs.json            # Blog metadata and links
├── blog-template.html        # Template for new blog posts
└── assets/
    └── images/               # Images for blog cards
```

### Blogs Repository (Blogs.github.io)
```
/
├── index.html                # Blog repository homepage
├── understanding-home-insurance.html
├── auto-insurance-tips.html
└── [other blog posts...]
```

## Important URLs
- **Landing Page**: https://billlayne.github.io/ethereal-blog-landing/
- **Blog Repository**: https://billlayne.github.io/Blogs.github.io/
- **Individual Blog**: https://billlayne.github.io/Blogs.github.io/[blog-filename].html

## Tips
1. Always test your blog post URL before adding it to `blogs.json`
2. Keep blog filenames descriptive and use hyphens instead of spaces
3. The landing page automatically displays the 6 most recent posts
4. Use the `featured` flag in `blogs.json` to highlight important posts