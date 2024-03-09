const Leaderboard = require('../models/leaderboardModel');
const User = require('../models/userModel');
const PaginationInfo = require('../utils/PaginationInfo');


// Crear un nuevo tablero de líderes
exports.createLeaderboard = async (req, res) => {
  const { name, game } = req.body;

  try {
    // Verificar si ya existe un tablero de líderes con el mismo nombre
    const existingLeaderboard = await Leaderboard.findOne({ name, deleted_at: null });

    if (existingLeaderboard) {
      // Si ya existe un tablero de líderes con el mismo nombre, responder con un error
      return res.status(400).json({ message: "Ya existe un tablero de líderes con el mismo nombre." });
    }

    // Si no existe un tablero de líderes con el mismo nombre, crear uno nuevo
    const newLeaderboard = new Leaderboard({ name, game });
    const savedLeaderboard = await newLeaderboard.save();

    // Responder con el tablero de líderes creado
    res.status(201).json(savedLeaderboard);
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso de creación
    res.status(400).json({ message: error.message });
  }
};


// Eliminar un tablero de líderes (registro de fecha en deleted_at)
exports.deleteLeaderboard = async (req, res) => {
  try {
    // Verificar si el tablero de líderes existe y si deleted_at es nulo
    const existingLeaderboard = await Leaderboard.findOne({ _id: req.params.id, deleted_at: null });

    if (!existingLeaderboard) {
      // Si no se encuentra el tablero de líderes o ya ha sido eliminado, responder con un error
      return res.status(404).json({ message: 'Tablero de líderes no encontrado o ya ha sido eliminado.' });
    }

    // Actualizar deleted_at para marcar el tablero de líderes como eliminado
    const deletedLeaderboard = await Leaderboard.findByIdAndUpdate(
      req.params.id, { deleted_at: Date.now() }, { new: true } );

    res.status(200).json({ message: 'Tablero de líderes eliminado exitosamente', leaderboard: deletedLeaderboard });
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso de eliminación
    res.status(500).json({ message: error.message });
  }
};


// Listar tableros de líderes con paginación
exports.listLeaderboardUsers = async (req, res) => {
  const { leaderboardId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const existingLeaderboard = await Leaderboard.findOne({ _id: leaderboardId, deleted_at: null });
  
  if (!existingLeaderboard) {
    return res.status(404).json({ message: 'Tablero de líderes no encontrado o ya ha sido eliminado.' });
  }

  try {
    // Contar el total de usuarios en el tablero de líderes especificado
    const totalCount = await User.countDocuments({ leaderboard_id: leaderboardId, deleted_at: null });

    // Encontrar los usuarios del tablero de líderes con paginación
    const users = await User.find({ leaderboard_id: leaderboardId, deleted_at: null })
      .sort({ score: -1 }) // Asegura que los usuarios estén ordenados por puntuación de manera descendente
      .skip((page - 1) * limit)
      .limit(limit);

    // Mapear los usuarios para calcular el rango de cada uno
    // Dado que están ordenados por puntuación de manera descendente, el rango se calcula directamente
    const rankedUsers = users.map((user, index) => ({
      ...user.toObject(),
      rank: (page - 1) * limit + index + 1 // Asegura que el rango empiece en 1 y aumente según el índice en la página actual
    }));
    pagination = new PaginationInfo(totalCount, limit, page)
    // Enviar la respuesta JSON con la lista de usuarios ordenados por su puntuación y con rangos calculados
    res.status(200).json({
      users: rankedUsers,
      pagination: pagination.asObject()
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


