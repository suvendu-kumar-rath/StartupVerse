export default async function handler(req, res) {
  const { path } = req.query;
  const pathString = Array.isArray(path) ? path.join('/') : path || '';
  
  try {
    const url = new URL(`https://ampercent.in/api/${pathString}`);
    
    // Forward query parameters
    Object.keys(req.query).forEach(key => {
      if (key !== 'path') {
        url.searchParams.append(key, req.query[key]);
      }
    });

    const response = await fetch(url.toString(), {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' && req.body ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
