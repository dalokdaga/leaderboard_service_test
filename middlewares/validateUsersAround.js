const mongoose = require('mongoose');

const validateUsersAround = (req, res, next) => {
    const { userId, n , leaderboardId} = req.params;
  
    // Verifica si userId está presente y es válido
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Se requiere un userId válido.' });
    }

    if (!leaderboardId || !mongoose.Types.ObjectId.isValid(leaderboardId)) {
        return res.status(400).json({ message: 'Se requiere un leaderboardId válido.' });
      }
    
    // Verifica si n está presente y es un número par
    if (!n || isNaN(parseInt(n)) || parseInt(n) % 2 !== 0) {
      return res.status(400).json({ message: 'Se requiere un número par para el parámetro n.' });
    }
  
    next();
  };
  
module.exports = validateUsersAround;
  