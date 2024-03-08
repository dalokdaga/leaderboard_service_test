const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validateUserData = require('../middlewares/validateUserData');
const validateUsersAround = require('../middlewares/validateUsersAround')

// Añadir un usuario a un tablero de líderes
router.post('/', validateUserData, userController.addUserToLeaderboard);

// Actualizar la puntuación de un usuario
router.put('/:userId', userController.updateUserScore);

router.get('/:leaderboardId/users/:userId/rank', userController.getUserRankAndScore);

router.get('/around-user/:leaderboardId/:userId/:n', validateUsersAround, userController.getUsersAroundUser);
module.exports = router;
