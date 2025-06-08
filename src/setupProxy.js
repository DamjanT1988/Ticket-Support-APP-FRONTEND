// src/setupProxy.js

// Importerar funktionen för att skapa en proxy-middleware
const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * Konfigurerar en utvecklingsproxy för API-anrop.
 * Alla anrop som börjar med /api dirigeras till angiven målserver.
 *
 * @param {Object} app - Express-app-instansen som skapas av Create React App
 */
module.exports = function(app) {
  app.use(
    '/api', // Base path som ska proxas
    createProxyMiddleware({
      // Målserver dit /api-anrop ska skickas
      target: 'https://localhost:7207',
      // Ändra origin-headern till målserverns värdnamn
      changeOrigin: true,
      // Acceptera självsignerat certifikat (användbart i lokal utveckling)
      secure: false,
      // Ställ in Connection-header till keep-alive för persistent connection
      headers: { Connection: 'keep-alive' }
    })
  );
};
