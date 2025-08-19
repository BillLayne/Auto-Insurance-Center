# How to Add New Blog Posts

This guide explains how to add new blog posts to your Bill Layne Insurance blog website.

## Quick Steps

1. **Create your blog post**: Copy the template from `blog-posts/blog-template.html`
2. **Edit the blog data file**: Open `data/blogs.json`
3. **Add your blog entry**: Follow the structure below
4. **Upload blog images** (optional): Add images to `assets/images/`
5. **Update the blog index**: Edit `blog-posts/index.html` if needed
6. **Deploy**: Push changes to GitHub

## Blog Entry Structure

Each blog entry in `data/blogs.json` should follow this format:

```json
{
  "id": "unique-blog-id",
  "title": "Your Blog Post Title",
  "summary": "A brief 1-2 sentence description of your blog post that will appear on the landing page.",
  "date": "2025-01-15",
  "tags": ["tag1", "tag2", "tag3"],
  "imageUrl": "assets/images/your-blog-cover.jpg",
  "linkUrl": "https://yourusername.github.io/blog/your-post-url"
}
```

### Field Descriptions

- **id**: A unique identifier for the blog post (e.g., "blog-003", "2025-01-15-post")
- **title**: The title that appears on the blog card
- **summary**: A brief description (keep it under 150 characters for best display)
- **date**: Publication date in YYYY-MM-DD format
- **tags**: Array of 1-3 tags (displayed as labels on the card)
- **imageUrl**: Path to the cover image (optional - will show gradient if missing)
- **linkUrl**: Full URL to your blog post

## Example: Adding a New Blog Post

1. Open `data/blogs.json`
2. Add a new entry to the array:

```json
[
  {
    "id": "blog-001",
    "title": "Your First Blog Post",
    "summary": "This is a sample blog post...",
    "date": "2025-01-01",
    "tags": ["introduction", "getting-started"],
    "imageUrl": "assets/images/blog-001-cover.jpg",
    "linkUrl": "https://yourusername.github.io/blog/your-first-post"
  },
  {
    "id": "blog-003",
    "title": "My New Blog Post",
    "summary": "Exploring advanced web development techniques and best practices.",
    "date": "2025-01-15",
    "tags": ["webdev", "javascript", "tutorial"],
    "imageUrl": "assets/images/blog-003-cover.jpg",
    "linkUrl": "https://yourusername.github.io/blog/advanced-webdev"
  }
]
```

## Creating Your Blog Posts

### Method 1: Add Posts Directly to This Repository (Recommended)

1. **Copy the template**: 
   - Start with `blog-posts/blog-template.html`
   - Save it with a descriptive name (e.g., `understanding-umbrella-insurance.html`)
   
2. **Place in correct folder**:
   - Save to the appropriate month: `blog-posts/2025/01/` for January 2025
   - This keeps your posts organized by date

3. **Edit the content**:
   - Replace all `[placeholder]` text with your content
   - Update the title, date, and category
   - Write your article sections

4. **Update the link in blogs.json**:
   ```json
   "link": "blog-posts/2025/01/understanding-umbrella-insurance.html"
   ```

### Method 2: Create Separate Repositories (Advanced)

If you prefer separate repositories for each blog:

1. Create a new repository on GitHub
2. Copy the blog template and save as `index.html`
3. Enable GitHub Pages in repository settings
4. Use the full URL in `blogs.json`:
   ```json
   "link": "https://yourusername.github.io/blog-umbrella-insurance/"
   ```

## Adding Blog Cover Images

1. Create your image (recommended: 1200x630px for social sharing)
2. Optimize the image (use tools like TinyPNG)
3. Save it in `assets/images/` with a descriptive name
4. Reference it in your blog entry's `imageUrl` field

## Best Practices

1. **Keep summaries concise**: 100-150 characters work best
2. **Use relevant tags**: Help readers find related content
3. **Consistent naming**: Use a pattern for IDs (e.g., "2025-01-15-title")
4. **Optimize images**: Keep file sizes small for fast loading
5. **Test locally**: Open `index.html` in a browser to preview changes

## Troubleshooting

### Blog posts not showing?
- Check browser console for errors
- Verify JSON syntax is valid (no trailing commas)
- Ensure the file path is correct: `data/blogs.json`

### Images not loading?
- Verify the image path is correct
- Check that the image file exists in `assets/images/`
- Try using absolute URLs for testing

### Need to test locally?
Run a local server to avoid CORS issues:
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# Then visit http://localhost:8000
```