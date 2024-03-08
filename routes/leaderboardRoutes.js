const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const validateLeaderboardData = require('../middlewares/validateLeaderboardData');

// Crear un nuevo tablero de líderes
router.post('/', validateLeaderboardData, leaderboardController.createLeaderboard);

// Eliminar un tablero de líderes
router.delete('/:id', leaderboardController.deleteLeaderboard);

// Listar tableros de líderes con paginación
router.get('/:leaderboardId/users', leaderboardController.listLeaderboardUsers);

module.exports = router;
