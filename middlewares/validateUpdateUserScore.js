const validateUpdateUserScore = (req, res, next) => {
    const { score, userId } = req.body;
  
    // Verificar si ambos, score y userId, están presentes
    if (score === undefined || userId === undefined) {
      return res.status(400).json({ message: 'Se requieren tanto score como userId en el cuerpo de la solicitud.' });
    }
  
    // Opcional: Validar tipos de datos (p.ej., asegurarte de que score es un número)
    if (typeof score !== 'number' || !userId.trim()) {
      return res.status(400).json({ message: 'Formato inválido para score o userId.' });
    }
  
    next();
  };
  
module.exports = validateUpdateUserScore;