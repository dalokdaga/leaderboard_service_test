const validateLeaderboardData = (req, res, next) => {
    const { name, game } = req.body;
  
    // Verificar si se proporcionan name y game en la solicitud
    if (!name || !game) {
      return res.status(400).json({ message: 'Se requieren name y game en la solicitud.' });
    }
  
    next();
  };
  
module.exports = validateLeaderboardData;