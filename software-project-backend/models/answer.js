const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answer: { type: String, required: true },
    question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
    votes: { type: Number, default: 0 },
    userName: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Answer', answerSchema);