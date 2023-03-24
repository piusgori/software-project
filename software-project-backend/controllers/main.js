const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Field = require('../models/field');
const Question = require('../models/question');
const User = require('../models/user');
const Answer = require('../models/answer');

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
        const { input } = req.params;
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
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const errorArray = errors.array();
            return next(new HttpError('Validation Error', errorArray[0].msg, 422));
        }
        const foundField = await Field.findById(field);
        if(!foundField) return next(new HttpError('Field Error', 'Field Not Found', 404));
        const foundUser = await User.findById(id);
        if(!foundUser) return next(new HttpError('User Error', 'User not found', 404));
        const newQuestion = new Question({ title, question, field, userName: `${foundUser.firstName} ${foundUser.lastName}`, user: id });
        await newQuestion.save();
        const addedQuestion = await Question.findById(newQuestion._id);
        res.status(200).json({ message: 'Question Added Successfully', question: addedQuestion['_doc'] });
    } catch (err) {
        return next(new HttpError('Unable to add question'));
    }
};

exports.getUserQuestions = async (req, res, next) => {
    try {
        const { user } = req.params;
        const foundQuestions = await Question.find({ user });
        res.status(200).json({ message: 'Questions for the user found successfully', questions: foundQuestions });
    } catch (err) {
        return next(new HttpError('Unable to get user questions'));
    }
};

exports.answerQuestion = async (req, res, next) => {
    try {
        const id = req.id;
        const { answer, question } = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const errorArray = errors.array();
            return next(new HttpError('Validation Error', errorArray[0].msg, 422));
        };
        const foundQuestion = await Question.findById(question);
        if(!foundQuestion) return next(new HttpError('Question Error', 'Question not found', 404));
        const foundUser = await User.findById(id);
        if(!foundUser) return next(new HttpError('User Error', 'User not found', 404));
        const newAnswer = new Answer({ answer, question, user: id, userName: `${foundUser.firstName} ${foundUser.lastName}` });
        await newAnswer.save();
        const createdAnswer = await Answer.findById(newAnswer._id);
        res.status(201).json({ message: 'Answer Added Successfully', answer: createdAnswer['_doc'] });
    } catch (err) {
        return next(new HttpError('Unable to answer question'));
    }
};

exports.getQuestionAnswers = async (req, res, next) => {
    try {
        const { question } = req.params;
        const foundAnswers = await Answer.find({ question });
        res.status(200).json({ message: 'Answers Found', answers: foundAnswers });
    } catch (err) {
        return next(new HttpError('Unable to get answers for a question'));
    }
};

exports.voteAnswer = async (req, res, next) => {
    try {
        const id = req.id;
        const { answer } = req.params;
        const foundAnswer = await Answer.findById(answer);
        if(!foundAnswer) return next(new HttpError('Answer Error', 'Answer Not Found', 404));
        const foundUser = await User.findById(id);
        if(!foundUser) return next(new HttpError('User Error', 'User not found', 404));
        await Answer.updateOne({ _id: answer }, { $inc: { votes: 1 } });
        await User.updateOne({ _id: id }, { $addToSet: { votedAnswers: answer } });
        res.status(200).json({ message: 'Answer voted' });
    } catch (err) {
        return next(new HttpError('Unable to vote question'));
    }
}

exports.unvoteAnswer = async (req, res, next) => {
    try {
        const id = req.id;
        const { answer } = req.params;
        const foundAnswer = await Answer.findById(answer);
        if(!foundAnswer) return next(new HttpError('Answer Error', 'Answer Not Found', 404));
        const foundUser = await User.findById(id);
        if(!foundUser) return next(new HttpError('User Error', 'User not found', 404));
        await Answer.updateOne({ _id: answer }, { $inc: { votes: -1 } });
        await User.updateOne({ _id: id }, { $pull: { votedAnswers: answer } });
        res.status(200).json({ message: 'Answer voted' });
    } catch (err) {
        return next(new HttpError('Unable to vote question'));
    }
}