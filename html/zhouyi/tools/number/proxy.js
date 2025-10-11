// Simple proxy server for API calls
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Proxy middleware
const apiProxy = createProxyMiddleware({
  target: 'https://app.withwind.run',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log('Proxying request:', req.method, req.url);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log('Proxy response:', proxyRes.statusCode, req.url);
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error occurred' });
  }
});

// Use the proxy for all /api routes
app.use('/api', apiProxy);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
  console.log('API calls will be proxied to https://app.withwind.run');
});