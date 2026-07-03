/**
 * Vercel Serverless Function to proxy posts API requests
 * This avoids CORS issues by making requests server-to-server
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Build the query string from the client request
    const queryParams = new URLSearchParams();
    
    if (req.query.page) queryParams.append('page', req.query.page);
    if (req.query.limit) queryParams.append('limit', req.query.limit);
    if (req.query.category) queryParams.append('category', req.query.category);
    if (req.query.trending) queryParams.append('trending', req.query.trending);

    // Make the server-side request to the external API
    const response = await fetch(`https://ampercent.in/api/posts?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error proxying posts:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch posts',
    });
  }
}
