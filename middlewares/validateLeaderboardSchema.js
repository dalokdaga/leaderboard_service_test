const Ajv = require('ajv');
const { createLeaderboardSchema, deleteLeaderboardSchema, listLeaderboardUsersSchema } = require('../schemas/leaderboardSchema');
const mongoose = require('mongoose');

const ajv = new Ajv();

const validateLeaderboardCreate = (req, res, next) => {
  const isValid = ajv.validate(createLeaderboardSchema, req.body);
  if (!isValid) {
    const errors = ajv.errors;
    return res.status(400).json({ message: 'Solicitud no válida para crear tablero de líderes', errors });
  }
  next();
};

const validateLeaderboardDelete = (req, res, next) => {
  const isValid = ajv.validate(deleteLeaderboardSchema, req.params);
  if (!isValid) {
    const errors = ajv.errors;
    return res.status(400).json({ message: 'Solicitud no válida para eliminar tablero de líderes', errors });
  }
  next();
};

const validateListLeaderboardUsers = (req, res, next) => {
  const isValid = ajv.validate(listLeaderboardUsersSchema, req.params);
  if (!isValid) {
    return res.status(400).json({ message: 'Solicitud no válida para listar usuarios del tablero de líderes', errors });
  }
  leaderboardId = req.params.leaderboardId
  if (!leaderboardId || !mongoose.Types.ObjectId.isValid(leaderboardId)) {
    return res.status(400).json({ message: 'Se requiere un leaderboardId válido.' });
  }  
  next();
};

module.exports = {
  validateLeaderboardCreate,
  validateLeaderboardDelete,
  validateListLeaderboardUsers
};
