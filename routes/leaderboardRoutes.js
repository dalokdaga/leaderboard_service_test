const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const keySecret = require('../middlewares/keySecretMiddleware');
const {  validateLeaderboardCreate, validateLeaderboardDelete, 
        validateListLeaderboardUsers} = require('../middlewares/validateLeaderboardSchema')

// Crear un nuevo tablero de líderes
router.post('/', [keySecret, validateLeaderboardCreate], leaderboardController.createLeaderboard);

// Eliminar un tablero de líderes
router.delete('/:id', [keySecret, validateLeaderboardDelete], leaderboardController.deleteLeaderboard);

// Listar tableros de líderes con paginación
router.get('/:leaderboardId/users', [keySecret, validateListLeaderboardUsers] ,leaderboardController.listLeaderboardUsers);

module.exports = router;
