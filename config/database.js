const mongoose = require('mongoose');
require('dotenv').config();

function connectToDatabase() {
  const mongoURI = process.env.MONGODB_URI;  
  mongoose.connect(mongoURI);
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
  db.once('open', () => {
    console.log('Conectado a MongoDB');
  });
}

module.exports = connectToDatabase;
