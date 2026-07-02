# API Service Documentation

This directory contains the API service utilities for fetching data from your backend.

## Overview

The `api.js` file provides all the necessary functions to communicate with your backend API. It includes:
- Posts/Articles management
- Category management
- Advertisement management
- Share tracking and analytics
- Visitor tracking

## Configuration

### Setting API Base URL

Edit `api.js` and update the `API_BASE_URL` to match your backend server:

```javascript
const API_BASE_URL = 'http://localhost:5000/api'; // Update with your backend URL
```

**Examples:**
- Local development: `http://localhost:5000/api`
- Production: `https://api.yourdomain.com/api`
- Staging: `https://staging-api.yourdomain.com/api`

## Available Functions

### Posts API

#### `getAllPosts(page, limit, category, trending)`
Fetch all posts with optional filtering and pagination.

```javascript
import { getAllPosts } from '../services/api'

// Basic usage
const data = await getAllPosts()

// With pagination
const data = await getAllPosts(1, 10)

// Filter by category
const data = await getAllPosts(1, 10, 'FUNDING')

// Get trending posts
const data = await getAllPosts(1, 10, null, true)
```

**Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Posts per page (default: 10)
- `category` (string): Filter by category (optional)
- `trending` (boolean): Get only trending posts (optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "Post Title",
        "category": "FUNDING",
        "author": "Author Name",
        "content": "Post content...",
        "image": "image-url",
        "date": "2026-07-02",
        "readTime": "8 min"
      }
    ],
    "totalPages": 5,
    "currentPage": 1
  }
}
```

#### `getPostById(postId)`
Fetch a single post by ID.

```javascript
const post = await getPostById(1)
```

### Category API

#### `getAllCategories()`
Fetch all available categories.

```javascript
import { getAllCategories } from '../services/api'

const categories = await getAllCategories()
```

**Response:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "FUNDING" },
    { "id": 2, "name": "AI" },
    { "id": 3, "name": "FOUNDERS" }
  ]
}
```

### Share API

#### `getShareCount(postId)`
Get total share count for a post.

```javascript
import { getShareCount } from '../services/api'

const shares = await getShareCount(1)
```

#### `getSharesByPlatform(postId)`
Get shares breakdown by platform.

```javascript
import { getSharesByPlatform } from '../services/api'

const breakdown = await getSharesByPlatform(1)
// Returns: { facebook: 10, twitter: 5, linkedin: 8, whatsapp: 3, email: 2 }
```

#### `sharePost(postId, platform)`
Record a share action.

```javascript
import { sharePost } from '../services/api'

await sharePost(1, 'facebook')
// Platforms: 'facebook', 'twitter', 'linkedin', 'whatsapp', 'email', 'direct'
```

### Advertisement API

#### `getAdvertisements()`
Fetch all advertisements.

```javascript
import { getAdvertisements } from '../services/api'

const ads = await getAdvertisements()
```

### Visitor Management

#### `getVisitorId()`
Get or generate a unique visitor ID.

```javascript
import { getVisitorId } from '../services/api'

const visitorId = getVisitorId()
// Returns: 'visitor-1688847392814-a1b2c3d4e5'
```

The visitor ID is stored in `localStorage` and persists across sessions.

## Usage in Components

### Example 1: Basic Posts List

```javascript
import { useState, useEffect } from 'react'
import { getAllPosts } from '../services/api'

export default function PostsList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts(1, 10)
        if (response.success) {
          setPosts(response.data.posts)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  )
}
```

### Example 2: Filtered Posts by Category

```javascript
import { useState, useEffect } from 'react'
import { getAllPosts, getAllCategories } from '../services/api'

export default function CategorizedPosts() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('FUNDING')

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories()
      if (response.success) {
        setCategories(response.data)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      const response = await getAllPosts(1, 10, selectedCategory)
      if (response.success) {
        setPosts(response.data.posts)
      }
    }

    fetchPostsByCategory()
  }, [selectedCategory])

  return (
    <div>
      <div>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={selectedCategory === cat.name ? 'active' : ''}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {/* Display posts */}
    </div>
  )
}
```

### Example 3: Share Tracking

```javascript
import { sharePost, getShareCount } from '../services/api'

async function handleShare(postId, platform) {
  // Record the share
  await sharePost(postId, platform)

  // Update share count display
  const shares = await getShareCount(postId)
  console.log(`Post now has ${shares.data.totalShares} shares`)
}
```

## Error Handling

All API functions return a standard response object:

```javascript
{
  success: boolean,
  data: any,      // Response data (when success = true)
  error: string   // Error message (when success = false)
}
```

**Example error handling:**

```javascript
try {
  const response = await getAllPosts()
  
  if (!response.success) {
    console.error('API Error:', response.error)
    // Use fallback data
    return fallbackPosts
  }
  
  return response.data.posts
} catch (error) {
  console.error('Network Error:', error)
  // Use fallback data
  return fallbackPosts
}
```

## Backend Requirements

Your backend API should provide the following endpoints:

### GET Endpoints
- `GET /api/posts?page=1&limit=10&category=FUNDING&trending=true`
- `GET /api/posts/:id`
- `GET /api/posts/:id/shares-count`
- `GET /api/posts/:id/shares-by-platform`
- `GET /api/categories`
- `GET /api/advertisements`

### POST Endpoints
- `POST /api/posts/:id/share` - Body: `{ visitorId, platform }`

## Best Practices

1. **Always use try-catch** when calling API functions
2. **Implement fallback data** for all components (in case API is unavailable)
3. **Add loading states** to improve user experience
4. **Cache responses** when appropriate to reduce API calls
5. **Handle pagination** when displaying large datasets
6. **Use environment variables** for API URLs in production
7. **Add error boundaries** to prevent component crashes

## Environment Variables (Optional)

Create a `.env` file in your project root:

```
VITE_API_URL=http://localhost:5000/api
```

Then update `api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
```

## Components Updated for API Integration

The following components have been updated to fetch data from the API:

- ✅ **News.jsx** - Fetches articles/posts
- ✅ **Stories.jsx** - Fetches story posts
- ✅ **Directory.jsx** - Fetches company/startup data
- ✅ **LiveFunding.jsx** - Fetches trending funding posts

All components include fallback data for when the API is unavailable.

## Troubleshooting

### "CORS error" in browser console
**Solution:** Configure CORS on your backend server to allow requests from your frontend domain.

### API returning 404
**Solution:** Verify the API_BASE_URL is correct and the backend server is running.

### Empty data even with success: true
**Solution:** Check if your backend is returning data in the expected format. Verify the response structure matches the examples above.

### Slow loading
**Solution:** Consider implementing pagination, caching, or request debouncing. Add pagination parameters to reduce data per request.

## Support

For issues or questions, please refer to your backend API documentation or contact your development team.
