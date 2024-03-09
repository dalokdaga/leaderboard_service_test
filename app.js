const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./config/database');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());

connectToDatabase();

app.use('/leaderboards', leaderboardRoutes);
app.use('/users', userRoutes);

module.exports = {
  startServer: () => {
    const PORT = process.env.PORT || 3000;
    return app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  },
  app: app // exporta también la instancia de la aplicación
};
