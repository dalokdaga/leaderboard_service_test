const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    name: { type: String, require: true},
    game: { type: String, require: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
  });

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard