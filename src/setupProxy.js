// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:7207',
      changeOrigin: true,
      secure: false,       // accept your self-signed cert
      headers: { Connection: 'keep-alive' }
    })
  );
};
