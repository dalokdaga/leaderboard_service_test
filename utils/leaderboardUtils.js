const User = require('../models/userModel');

const findRankOfUser = async (userId, leaderboardId) => {
  try {
    const rankByScore = await findRankByScore(userId, leaderboardId);
    return rankByScore;
  } catch (error) {
    throw new Error('No se pudo encontrar el rango del usuario');
  }
};

const findRankByScore = async (userId, leaderboardId) => {
  try {
    const usersSortedByScore = await User.find({ leaderboard_id: leaderboardId, deleted_at: null }).sort({ score: -1 });
    const userIndex = usersSortedByScore.findIndex(user => user._id.toString() === userId && user.leaderboard_id.toString() === leaderboardId);
    return userIndex + 1; // Sumamos 1 porque los índices comienzan desde 0
  } catch (error) {
    throw new Error('No se pudo encontrar el rango del usuario');
  }
};

module.exports = {
  findRankOfUser,
  findRankByScore
};
