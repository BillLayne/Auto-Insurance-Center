'use strict';

/**
 * Ethereal Blog - Dynamic Content Loader
 * 
 * This script handles:
 * - Loading blog post data (simulated from external JSON)
 * - Creating dynamic blog cards with smooth animations
 * - Error handling and loading states
 * - Scroll-based animations
 * - Accessibility enhancements
 */

// Sample blog data (in production, this would be fetched from data/blogs.json)
const SAMPLE_BLOG_DATA = [
  {
    "id": "2024070101",
    "title": "The Art of Ethereal Design: Creating Digital Serenity",
    "summary": "Explore the delicate balance between minimalism and visual impact, discovering how whitespace and subtle elements create powerful user experiences that resonate with modern audiences.",
    "date": "July 1, 2025",
    "tags": ["Design", "UI/UX", "Minimalism"],
    "imageUrl": "assets/images/ethereal-design.webp",
    "linkUrl": "https://your-github-username.github.io/blog-repo/ethereal-design"
  },
  {
    "id": "2024063001",
    "title": "Mastering Micro-Interactions in Modern Web Development",
    "summary": "Deep dive into the subtle animations and feedback mechanisms that make websites feel alive and responsive, with practical examples using vanilla JavaScript and CSS.",
    "date": "June 30, 2025",
    "tags": ["JavaScript", "Animation", "WebDev"],
    "imageUrl": "assets/images/micro-interactions.webp",
    "linkUrl": "https://your-github-username.github.io/blog-repo/micro-interactions"
  },
  {
    "id": "2024062901",
    "title": "Typography That Speaks: The Psychology of Font Pairings",
    "summary": "Understanding how serif and sans-serif combinations create emotional resonance and hierarchy in digital spaces, with curated examples from Google Fonts.",
    "date": "June 29, 2025",
    "tags": ["Typography", "Design", "Psychology"],
    "imageUrl": "assets/images/typography-psychology.webp",
    "linkUrl": "https://your-github-username.github.io/blog-repo/typography-psychology"
  },
  {
    "id": "2024062801",
    "title": "Color in the Digital Age: Muted Palettes for 2025",
    "summary": "Discover why desaturated, sophisticated color schemes are dominating modern design, and learn to create palettes that reduce eye strain while maintaining visual interest.",
    "date": "June 28, 2025",
    "tags": ["Color Theory", "Trends", "Design"],
    "imageUrl": "assets/images/muted-colors.webp",
    "linkUrl": "https://your-github-username.github.io/blog-repo/muted-colors"
  },
  {
    "id": "2024062701",
    "title": "Static Sites, Dynamic Content: The JAMstack Revolution",
    "summary": "Learn how to build lightning-fast static sites that feel dynamic, using modern APIs and progressive enhancement techniques for optimal performance.",
    "date": "June 27, 2025",
    "tags": ["JAMstack", "Performance", "Architecture"],
    "imageUrl": "assets/images/jamstack-revolution.webp",
    "linkUrl": "https://your-github-username.github.io/blog-repo/jamstack-revolution"
  }
];

/**
 * Application State Management
 */
class EtherealBlog {
  constructor() {
    this.blogContainer = null;
    this.loadingState = null;
    this.errorState = null;
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  /**
   * Setup DOM references and start loading
   */
  setup() {
    this.blogContainer = document.getElementById('blog-grid');
    this.loadingState = document.getElementById('loading-state');
    this.errorState = document.getElementById('error-state');

    if (!this.blogContainer) {
      console.error('Blog container not found');
      return;
    }
    
    // Load blog posts
    this.loadBlogs();
  }

  /**
   * Simulate loading blog data from external JSON file
   * In production, this would use: fetch('data/blogs.json')
   */
  async loadBlogs() {
    try {
      // Show loading state
      this.showLoadingState();

      // Fetch blog data from JSON file
      const response = await fetch('data/blogs.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let blogData;
      try {
        blogData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Response was:', responseText);
        throw new Error('Failed to parse JSON response');
      }

      // Validate data
      if (!Array.isArray(blogData) || blogData.length === 0) {
        console.error('Blog data validation failed:', blogData);
        throw new Error('Invalid blog data format');
      }

      // Hide loading state and render blogs
      this.hideLoadingState();
      this.renderBlogs(blogData);

    } catch (error) {
      console.error('Failed to load blogs:', error);
      this.showErrorState();
    }
  }

  /**
   * Create delay for loading simulation
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Show loading state
   */
  showLoadingState() {
    if (this.loadingState) {
      this.loadingState.classList.remove('hidden');
    }
    if (this.errorState) {
      this.errorState.classList.add('hidden');
    }
  }

  /**
   * Hide loading state
   */
  hideLoadingState() {
    if (this.loadingState) {
      this.loadingState.classList.add('hidden');
    }
  }

  /**
   * Show error state
   */
  showErrorState() {
    this.hideLoadingState();
    if (this.errorState) {
      this.errorState.classList.remove('hidden');
    }
  }

  /**
   * Render blog posts to the DOM
   */
  renderBlogs(blogData) {
    if (!this.blogContainer) return;

    // Clear any existing content
    this.blogContainer.innerHTML = '';

    // Create blog cards
    const fragment = document.createDocumentFragment();
    
    blogData.forEach((blog, index) => {
      const blogCard = this.createBlogCard(blog, index);
      fragment.appendChild(blogCard);
    });

    // Add all cards to the container
    this.blogContainer.appendChild(fragment);

    // Add staggered fade-in effect
    setTimeout(() => {
      const cards = this.blogContainer.querySelectorAll('.blog-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 150);
      });
    }, 100);
  }

  /**
   * Create individual blog card element
   */
  createBlogCard(blog, index) {
    // Create main card element
    const card = document.createElement('a');
    card.className = 'blog-card';
    card.href = blog.linkUrl;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.setAttribute('aria-label', `Read blog post: ${blog.title}`);

    // Create card content
    const imageHTML = blog.imageUrl 
      ? `<img src="${blog.imageUrl}" alt="${this.escapeHTML(blog.title)}" loading="lazy" onerror="this.parentElement.innerHTML='<span>Bill Layne Insurance</span>'">`
      : '<span>Bill Layne Insurance</span>';
    
    card.innerHTML = `
      <article class="blog-card-article">
        <div class="blog-card-image" role="img" aria-label="Blog post cover image">
          ${imageHTML}
        </div>
        <div class="blog-card-content">
          <div class="blog-card-tags" role="list" aria-label="Post tags">
            ${this.createTagsHTML(blog.tags)}
          </div>
          <h3 class="blog-card-title">${this.escapeHTML(blog.title)}</h3>
          <time class="blog-card-date" datetime="${this.formatDatetime(blog.date)}">${blog.date}</time>
          <p class="blog-card-summary">${this.escapeHTML(blog.summary)}</p>
        </div>
      </article>
    `;

    // Add keyboard navigation support
    card.addEventListener('keydown', this.handleCardKeydown.bind(this));

    return card;
  }

  /**
   * Create tags HTML
   */
  createTagsHTML(tags) {
    return tags.map(tag => 
      `<span class="blog-tag" role="listitem">${this.escapeHTML(tag)}</span>`
    ).join('');
  }

  /**
   * Format date for datetime attribute
   */
  formatDatetime(dateString) {
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Handle keyboard navigation for cards
   */
  handleCardKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    }
  }
}

/**
 * Additional utility functions for enhanced UX
 */

/**
 * Add smooth scrolling for any internal links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Add focus management for better accessibility
 */
function initFocusManagement() {
  // Skip to content link (if added to HTML)
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const main = document.querySelector('main');
      if (main) {
        main.setAttribute('tabindex', '-1');
        main.focus();
        main.addEventListener('blur', () => main.removeAttribute('tabindex'), { once: true });
      }
    });
  }
}

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize main blog functionality
  new EtherealBlog();
  
  // Initialize additional features
  initSmoothScroll();
  initFocusManagement();
  
  // Log successful initialization
  console.log('🛡️ Bill Layne Insurance Blog initialized successfully');
});

/**
 * Handle any uncaught errors gracefully
 */
window.addEventListener('error', (event) => {
  console.error('Ethereal Blog Error:', event.error);
  
  // Could show a user-friendly error message here
  const errorContainer = document.getElementById('error-state');
  if (errorContainer) {
    errorContainer.classList.remove('hidden');
  }
});

/**
 * Export for potential testing or external access
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EtherealBlog };
}