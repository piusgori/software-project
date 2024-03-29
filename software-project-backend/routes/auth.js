const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const token = require('../middleware/user-token');

const router = express.Router();

router.post('/register', [
    body('firstName').isLength({ min: 3 }).withMessage('Please enter your first name. Should be at least 3 characters long'),
    body('lastName').isLength({ min: 3 }).withMessage('Please enter your last name. Should be at least 3 characters long'),
], authController.register);

router.post('/login', authController.login);

router.get('/access-token', authController.getAccessToken);

router.get('/user-data', authController.getUserData);

router.get('/user/:id', authController.getUserDetails);

router.patch('/follow/:userId', token, authController.followUser);

router.patch('/unfollow/:userId', token, authController.unfollowUser);

module.exports = router;