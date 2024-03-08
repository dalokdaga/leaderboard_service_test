const validateUserData = (req, res, next) => {    
    const { username, email, score, leaderboardId } = req.body;
  
    // Verificar si se proporcionan todos los campos requeridos
    if (!username || !email || !score || !leaderboardId) {
      return res.status(400).json({ message: 'Se requiere username, email, score y leaderboardId en el cuerpo de la solicitud.' });
    }
  
    next();
  };
  
module.exports = validateUserData;
