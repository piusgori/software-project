const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const adminToken = require('../middleware/admin-token');

const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Please enter a valid E-Mail Address'),
    body('name').isLength({ min: 3 }).withMessage('Please enter a valid name of at least three characters'),
    body('password').isLength({ min: 8 }).withMessage('Please enter a strong password of at least 8 characters long')
], adminController.register);

router.post('/login', adminController.login);

router.post('/field', adminToken, [
    body('name').isLength({ min: 2 }).withMessage('Please enter the name of the field of at least 2 characters long')
], adminController.addField);

router.get('/questions', adminToken, adminController.getQuestions);

router.get('/answers', adminToken, adminController.getAnswers);

router.get('/users', adminToken, adminController.getUsers);

module.exports = router;