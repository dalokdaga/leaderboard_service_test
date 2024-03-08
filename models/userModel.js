const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, require: true},
    email: { type: String, require: true},
    is_admin: { type: Boolean, default: false},
    leaderboard_id: mongoose.Schema.Types.ObjectId,
    score: { type: Number, require: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
  });
  
const User = mongoose.model('User', userSchema);

module.exports = User;
