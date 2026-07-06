// ==================== API Configuration ====================
// Use relative /api path - proxied by Vite in dev, rewritten by Vercel in production
const API_BASE_URL = '/api';

// ==================== SIMPLE CACHE ====================
// Prevents 429 rate-limit errors when multiple components fetch on the same page.
// In-flight requests are shared so the same URL is never fetched twice simultaneously.
const cache = new Map();         // url -> { data, expiresAt }
const inFlight = new Map();      // url -> Promise
const CACHE_TTL = 60 * 1000;     // 60 seconds - balances rate-limit protection with fresh data

async function cachedFetch(url) {
  const now = Date.now();

  // Return cached result if still fresh
  const cached = cache.get(url);
  if (cached && now < cached.expiresAt) return cached.data;

  // Reuse an in-flight request for the same URL
  if (inFlight.has(url)) return inFlight.get(url);

  // Add small random jitter (0-200ms) to spread out simultaneous requests
  const jitter = Math.random() * 200;
  
  const promise = new Promise(resolve => setTimeout(resolve, jitter))
    .then(() => fetch(url))
    .then(async (res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      cache.set(url, { data, expiresAt: Date.now() + CACHE_TTL });
      inFlight.delete(url);
      return data;
    })
    .catch((err) => {
      inFlight.delete(url);
      throw err;
    });

  inFlight.set(url, promise);
  return promise;
}

// ==================== IMAGE HELPER ====================
// Images are stored as a JSON string array e.g. `"[\"/uploads/images/foo.png\"]"` on the backend.
// Always construct full image URLs with the backend domain.
const IMAGE_BASE = 'https://ampercent.in';

function parseImages(imagesField) {
  if (!imagesField) return null;
  try {
    const arr = JSON.parse(imagesField);
    if (Array.isArray(arr) && arr.length > 0 && arr[0]) {
      const path = arr[0];
      return path.startsWith('http') ? path : IMAGE_BASE + path;
    }
  } catch {
    if (typeof imagesField === 'string' && imagesField.startsWith('/')) {
      return IMAGE_BASE + imagesField;
    }
  }
  return null;
}

// Normalize raw API post to the shape all components expect.
function normalizePost(post) {
  if (!post) return post;
  const image = parseImages(post.images);
  const content = post.matter || post.content || post.description || '';
  return {
    ...post,
    title:    post.heading   || post.title   || '',
    content,
    excerpt:  post.excerpt   || (content ? content.substring(0, 150) : ''),
    image,
    category: (post.category || '').toUpperCase(),
    trending: post.isTrending || post.trending || false,
    author:   post.author    || post.authorId,
    readTime: post.readTime  || '5 min',
  };
}

export function getPostImage(post) {
  if (!post) return null;
  // After normalization the image is already resolved; also fall back to raw fields.
  return post.image || parseImages(post.images) || null;
}

// ==================== VISITOR ID MANAGEMENT ====================
/**
 * Get or generate visitor ID
 * Stored in localStorage to track user across sessions
 */
function getVisitorId() {
  let visitorId = localStorage.getItem('visitorId');
  
  if (!visitorId) {
    visitorId = 'visitor-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('visitorId', visitorId);
  }
  
  return visitorId;
}

// ==================== POSTS API ====================

/**
 * Get all posts with pagination
 * @param {number} page - Page number (default: 1)
 * @param {number} limit - Posts per page (default: 10)
 * @param {string} category - Filter by category (optional)
 * @param {boolean} trending - Get only trending posts (optional)
 */
async function getAllPosts(page = 1, limit = 10, category = null, trending = false) {
  try {
    let url = `${API_BASE_URL}/posts?page=${page}&limit=${limit}`;
    if (category) url += `&category=${encodeURIComponent(category.toLowerCase())}`;
    if (trending) url += `&trending=true`;
    const data = await cachedFetch(url);
    if (data?.data?.posts) {
      data.data.posts = data.data.posts.map(normalizePost);
    }
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get single post by ID
 * @param {number} postId - Post ID
 */
async function getPostById(postId) {
  try {
    const data = await cachedFetch(`${API_BASE_URL}/posts/${postId}`);
    if (data?.data) {
      data.data = normalizePost(data.data);
    }
    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return { success: false, error: error.message };
  }
}

// ==================== SHARE API ====================

/**
 * Get total share count for a post
 * @param {number} postId - Post ID
 */
async function getShareCount(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/shares-count`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching share count:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get shares breakdown by platform
 * @param {number} postId - Post ID
 */
async function getSharesByPlatform(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/shares-by-platform`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching shares by platform:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Share a post on platform
 * @param {number} postId - Post ID
 * @param {string} platform - Platform (facebook, twitter, linkedin, whatsapp, email, direct)
 */
async function sharePost(postId, platform = 'direct') {
  try {
    const visitorId = getVisitorId();
    
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        visitorId: visitorId,
        platform: platform
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sharing post:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ==================== CATEGORY API ====================

/**
 * Get all categories
 */
async function getAllCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ==================== ADVERTISEMENT API ====================

/**
 * Get all advertisements
 */
async function getAdvertisements() {
  try {
    const response = await fetch(`${API_BASE_URL}/advertisements`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching advertisements:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// ==================== EXPORT ALL FUNCTIONS ====================

export {
  getVisitorId,
  getAllPosts,
  getPostById,
  getShareCount,
  getSharesByPlatform,
  sharePost,
  getAllCategories,
  getAdvertisements,
  API_BASE_URL
};
