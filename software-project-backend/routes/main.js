const express = require('express');
const { body } = require('express-validator');

const mainController = require('../controllers/main');
const userToken = require('../middleware/user-token');

const router = express.Router();

router.get('/', mainController.main);

router.get('/fields', mainController.getFields);

router.get('/top-questions', userToken, mainController.getTopQuestions);

router.get('/related-questions/:field', userToken, mainController.getRelatedQuestions);

router.get('/search/:input', userToken, mainController.searchQuestions);

router.get('/question/:questionId', mainController.getSingleQuestion);

router.post('/add-question', userToken, [
    body('title').isLength({ min: 3 }).withMessage('Please enter the title of the question. Should be at least 3 characters long.'),
    body('question').isLength({ min: 3 }).withMessage('Please enter the question. Should be at least 3 characters long.'),
    body('field').isLength({ min: 10 }).withMessage('Please select the field of the question'),
], mainController.addQuestion);

router.get('/user-questions/:user', mainController.getUserQuestions);

router.post('/answer-question', userToken, [
    body('answer').isLength({ min: 3 }).withMessage('Please enter the answer to the question. Should be at least 3 characters'),
    body('question').isLength({ min: 10 }).withMessage('Please select the question to which this answer belongs')
], mainController.answerQuestion);

router.get('/question-answers/:ques', mainController.getQuestionAnswers);

router.patch('/vote/:answer', userToken, mainController.voteAnswer);

router.patch('/unvote/:answer', userToken, mainController.unvoteAnswer);

module.exports = router;