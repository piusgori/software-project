const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Field = require('../models/field');
const Question = require('../models/question');
const User = require('../models/user');

exports.main = async (req, res, next) => {
    res.status(200).json({ message: 'Welcome to DevHub' });
};

exports.getFields = async (req, res, next) => {
    try {
        const fields = await Field.find();
        res.status(200).json({ message: 'Fields Found', fields });
    } catch (err) {
        return next(new HttpError('Unable to get fields'));
    }
};

exports.getTopQuestions = async (req, res, next) => {
    try {
        const id = req.id;
        const questions = await Question.find().sort({ views: -1 }).limit(10);
        const foundUser = await User.findById(id, { password: 0, githubId: 0 });
        questions.forEach(async (q) => {
            if (!foundUser.viewedQuestions.includes(q._id)) {
                await Question.updateOne({ _id: q._id }, { $inc: { views: 1 } });
                await User.updateOne({ _id: id }, { $addToSet: { viewedQuestions: q._id } });
            }
        });
        res.status(200).json({ message: 'Top questions found successfully', questions: questions });
    } catch (err) {
        return next(new HttpError('Unable to get top questions'));
    }
};

exports.getRelatedQuestions = async (req, res, next) => {
    try {
        const id = req.id;
        const { field } = req.params;
        const questions = await Question.find({ field });
        const foundUser = await User.findById(id, { password: 0, githubId: 0 });
        questions.forEach(async (q) => {
            if (!foundUser.viewedQuestions.includes(q._id)) {
                await Question.updateOne({ _id: q._id }, { $inc: { views: 1 } });
                await User.updateOne({ _id: id }, { $addToSet: { viewedQuestions: q._id } });
            }
        });
        res.status(200).json({ message: 'Related questions found successfully', questions });
    } catch (err) {
        return next(new HttpError('Unable to get related questions'));
    }
};

exports.searchQuestions = async (req, res, next) => {
    try {
        const id = req.id;
        const { input } = req.body;
        const questions = await Question.find({ $or: [{ title: { $regex: input } }, { question: { $regex: input } }] });
        const foundUser = await User.findById(id, { password: 0, githubId: 0 });
        questions.forEach(async (q) => {
            if (!foundUser.viewedQuestions.includes(q._id)) {
                await Question.updateOne({ _id: q._id }, { $inc: { views: 1 } });
                await User.updateOne({ _id: id }, { $addToSet: { viewedQuestions: q._id } });
            }
        });
        res.status(200).json({ message: 'Questions queried', questions });
    } catch (err) {
        return next(new HttpError('Unable to search for a question'));
    }
};

exports.addQuestion = async (req, res, next) => {
    try {
        const id = req.id;
        const { title, question, field } = req.body;
    } catch (err) {
        return next(new HttpError('Unable to add question'));
    }
}