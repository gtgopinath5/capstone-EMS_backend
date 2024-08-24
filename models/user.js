// Schema definition remains the same
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
    name: String,
    location: {
        type: String,
        default: 'unknown'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

// Create a model from the schema and export it
module.exports = mongoose.model('User', userSchema, 'users');
