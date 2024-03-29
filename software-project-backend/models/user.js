const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, default: '' },
    password: { type: String, default: '' },
    githubId: { type: String, default: '' },
    viewedQuestions: { type: Array, default: [] },
    votedAnswers: { type: Array, default: [] },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);