// Importa la instancia de la aplicación desde app.js
const { startServer } = require('./app');

// Inicia el servidor
const server = startServer();

// Maneja cualquier error al iniciar el servidor
server.on('error', (error) => {
  console.error('Error al iniciar el servidor:', error);
});
