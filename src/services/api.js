// ==================== API Configuration ====================
// Use relative /api path - proxied by Vite in dev, rewritten by Vercel in production
const API_BASE_URL = '/api';

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
    
    if (category) url += `&category=${category}`;
    if (trending) url += `&trending=true`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get single post by ID
 * @param {number} postId - Post ID
 */
async function getPostById(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return {
      success: false,
      error: error.message
    };
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
