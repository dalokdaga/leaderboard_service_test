const KeySecret = require('../models/keySecretModel');


const verificarClaveAPI = async (req, res, next) => {
  try {    
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({ mensaje: 'Clave API no proporcionada' });
    }

    const keySecret = await KeySecret.findOne({ key: apiKey, deleted_at: null});
    if (!keySecret) {
      return res.status(401).json({ mensaje: 'Clave API no válida' });
    }
    
    next();
  } catch (error) {
    console.error('Error al verificar la clave API:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = verificarClaveAPI;
