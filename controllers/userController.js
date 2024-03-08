const User = require('../models/userModel');
const Leaderboard = require('../models/leaderboardModel');


// Añadir un usuario a un tablero de líderes
exports.addUserToLeaderboard = async (req, res) => {
  const { username, email, score, leaderboardId } = req.body;

  try {
    // Verificar si el tablero de líderes existe
    const leaderboard = await Leaderboard.findOne({ _id: leaderboardId, deleted_at: null });
    if (!leaderboard) {
      return res.status(404).json({ message: 'Tablero de líderes no encontrado.' });
    }

    // Verificar si ya existe un usuario con el mismo email en el mismo tablero de líderes
    const existingUser = await User.findOne({ email: email, leaderboard_id: leaderboardId, deleted_at: null });
    if (existingUser) {
      return res.status(400).json({ message: 'Ya existe un usuario con ese email en el tablero de líderes.' });
    }

    // Crear un nuevo usuario
    const user = new User({ username, email, score, leaderboard_id: leaderboardId });
    const newUser = await user.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar la puntuación de un usuario
exports.updateUserScore = async (req, res) => {
  const { score } = req.body;
  const userId = req.params.userId; // Suponiendo que el ID del usuario se pasa como un parámetro en la URL

  try {
    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Actualizar la puntuación del usuario
    user.score = score;
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserRankAndScore = async (req, res) => {
  const userId = req.params.userId;
  const leaderboardId = req.params.leaderboardId; // Asumiendo que quieres buscar en un tablero específico

  try {
    const user = await User.findById(userId);
    if (!user || user.leaderboard_id.toString() !== leaderboardId) {
      return res.status(404).json({ message: 'Usuario no encontrado en el tablero de líderes especificado.' });
    }

    // Contar cuántos usuarios tienen un puntaje mayor que nuestro usuario
    const rank = await User.countDocuments({      
      leaderboard_id: leaderboardId,
      score: { $gt: user.score }
    }) + 1; // +1 porque el conteo devuelve cuántos tienen más, por lo que sumamos uno para obtener el rango del usuario

    res.json({ userId: user.id, username: user.username, email: user.email, score: user.score, rank });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsersAroundUser = async (req, res) => {
  const { userId, leaderboardId, n } = req.params; // Asume que n es par para simplificar
  const half = n / 2;

  try {
    // Obtener usuarios ordenados por puntaje
    const usersSortedByScore = await User.find({ leaderboard_id: leaderboardId, deleted_at: null })
                                         .sort({ score: -1 });

    // Encontrar el índice del usuario objetivo en la lista ordenada
    const userIndex = usersSortedByScore.findIndex(user => user._id.toString() === userId 
                                                       && user.leaderboard_id.toString() === leaderboardId);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuario no encontrado en el tablero de líderes.' });
    }

    // Calcula los rangos para buscar
    let lowerBound = Math.max(0, userIndex - half); 
    let upperBound = Math.min(usersSortedByScore.length - 1, userIndex + half);

    // Ajusta los rangos para asegurarse de que el usuario objetivo esté en el centro
    const numUsersAroundUser = upperBound - lowerBound + 1;
    if (numUsersAroundUser < n) {
      // Si el número de usuarios alrededor del usuario objetivo es menor que n, ajusta los rangos para incluir más usuarios
      const diff = n - numUsersAroundUser;
      const offset = Math.floor(diff / 2);
      lowerBound = Math.max(0, lowerBound - offset);
      upperBound = Math.min(usersSortedByScore.length - 1, upperBound + (diff - offset));
    }

    // Filtra la lista de usuarios basada en el rango de índices
    const usersAroundUser = usersSortedByScore.slice(lowerBound, upperBound + 1);

    res.json(usersAroundUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
