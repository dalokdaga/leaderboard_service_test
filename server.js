// Importa la instancia de la aplicación desde app.js
const { startServer } = require('./app');

// Define el puerto que deseas utilizar (por ejemplo, 4000)
const PORT = process.env.PORT || 3000;

// Inicia el servidor con el puerto especificado
const server = startServer(PORT);

// Maneja cualquier error al iniciar el servidor
server.on('error', (error) => {
  console.error('Error al iniciar el servidor:', error);
});
