const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUserData = require('../middlewares/validateUserData');
const validateUsersAround = require('../middlewares/validateUsersAround')
const keySecret = require('../middlewares/keySecretMiddleware');

// Añadir un usuario a un tablero de líderes
router.post('/', [keySecret, validateUserData], userController.addUserToLeaderboard);

// Actualizar la puntuación de un usuario
router.put('/:userId', keySecret, userController.updateUserScore);

router.get('/:leaderboardId/users/:userId/rank', keySecret, userController.getUserRankAndScore);

router.get('/around-user/:leaderboardId/:userId/:n', keySecret, validateUsersAround, userController.getUsersAroundUser);
module.exports = router;
