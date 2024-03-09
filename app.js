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
  startServer: (port = 3002) => {
    return app.listen(port, () => {
      console.log(`Servidor iniciado en el puerto ${port}`);
    });
  },
  app: app
};
