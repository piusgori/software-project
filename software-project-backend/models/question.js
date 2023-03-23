const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    title: { type: String, required: true },
    question: { type: String, required: true },
    field: { type: Schema.Types.ObjectId, ref: 'Field', required: true },
    views: { type: Number, default: 0 },
    userName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);