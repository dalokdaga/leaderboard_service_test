const mongoose = require('mongoose');

const keySecretSchema = new mongoose.Schema({
    key: { type: String, required: true },
    description: { type: String, required: true },
    algorithm: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
});

const KeySecret = mongoose.model('KeySecret', keySecretSchema);

module.exports = KeySecret;