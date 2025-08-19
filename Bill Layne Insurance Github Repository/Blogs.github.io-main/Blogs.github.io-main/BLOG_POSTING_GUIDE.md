# Blog Posting Guide for Bill Layne Insurance

## Overview
This guide walks you through adding new blog posts to your insurance blog website hosted on GitHub Pages.

## Method 1: Adding Blog Posts Directly to This Repository

### Step 1: Create Your Blog Post
1. Copy the template file: `blog-posts/blog-template.html`
2. Rename it with a descriptive filename (e.g., `understanding-home-insurance-coverage.html`)
3. Place it in the appropriate month folder: `blog-posts/2025/01/` (for January 2025)

### Step 2: Edit Your Blog Post
Replace the placeholder content in the template:
- `[Blog Title]` - Your article title
- `[Brief description]` - Meta description for SEO
- `[Month Day, Year]` - Publication date (e.g., "January 15, 2025")
- `[Category]` - Article category (e.g., "Home Insurance", "Auto Insurance", "Life Insurance")
- Content sections - Replace with your actual content

### Step 3: Update the Blog Data
1. Open `data/blogs.json`
2. Add your new blog post entry at the beginning of the array:

```json
{
    "id": "unique-blog-id",
    "title": "Your Blog Title",
    "excerpt": "A brief 2-3 sentence summary of your blog post...",
    "date": "2025-01-15",
    "category": "Home Insurance",
    "link": "blog-posts/2025/01/your-blog-filename.html",
    "featured": false
}
```

### Step 4: Update the Blog Repository Index
1. Open `blog-posts/index.html`
2. Add a link to your new post in the appropriate year section
3. Remove the "No blog posts yet" message if it's the first post of the year

### Step 5: Commit and Push
1. Stage all changes: `git add .`
2. Commit: `git commit -m "Add new blog post: [Your Blog Title]"`
3. Push to GitHub: `git push origin main`

## Method 2: Creating Separate Repositories for Each Blog Post

**Note**: This method is more complex and typically not recommended for blog posts. The direct method above is simpler and more maintainable.

If you still want to create separate repositories:

### Step 1: Create a New Repository
1. Go to GitHub and create a new repository (e.g., `blog-understanding-home-insurance`)
2. Initialize with a README

### Step 2: Create Your Blog Post
1. Use the same template from `blog-posts/blog-template.html`
2. Create an `index.html` file in your new repository
3. Update all the navigation links to point back to your main site

### Step 3: Enable GitHub Pages
1. Go to Settings → Pages
2. Set source to "Deploy from a branch"
3. Select "main" branch and "/ (root)" folder
4. Save

### Step 4: Link to Your Main Site
1. Update `data/blogs.json` with the full GitHub Pages URL:
```json
{
    "link": "https://yourusername.github.io/blog-understanding-home-insurance/"
}
```

## Best Practices

### File Naming
- Use lowercase letters
- Replace spaces with hyphens
- Keep names descriptive but concise
- Example: `understanding-umbrella-insurance-2025.html`

### SEO Tips
- Write clear, descriptive titles (50-60 characters)
- Create compelling meta descriptions (150-160 characters)
- Use headers (H2, H3) to structure content
- Include relevant keywords naturally

### Content Guidelines
- Start with a hook to engage readers
- Break content into scannable sections
- Use bullet points for lists
- Include a clear call-to-action
- Keep paragraphs short (3-4 sentences)

### Image Usage
- Store images in `assets/images/` or `blog-posts/images/`
- Use descriptive filenames
- Optimize images for web (compress, appropriate size)
- Add alt text for accessibility

## Quick Checklist for Each New Post

- [ ] Copy and rename the template file
- [ ] Update all placeholder content
- [ ] Add entry to `blogs.json`
- [ ] Update `blog-posts/index.html` if needed
- [ ] Test locally if possible
- [ ] Commit and push to GitHub
- [ ] Verify the post appears on your live site

## Troubleshooting

### Post Not Appearing
- Check that `blogs.json` is valid JSON (no syntax errors)
- Ensure the date format is correct (YYYY-MM-DD)
- Verify the file path in the link is correct
- Clear browser cache and refresh

### Broken Links
- Check that all navigation links use absolute paths
- Ensure GitHub Pages is enabled and deployed
- Wait a few minutes for GitHub Pages to update

## Need Help?
If you encounter issues, check the GitHub Pages documentation or review the existing blog post examples in your repository.