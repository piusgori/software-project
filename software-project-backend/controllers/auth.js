const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const axios = require('axios');

const HttpError = require('../models/http-error');
const User = require('../models/user');

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, githubId } = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const errorArray = errors.array();
            return next(new HttpError('Validation Error', errorArray[0].msg, 422))
        };
        if(!password && !githubId) return next(new HttpError('Validation Error', 'Please choose a valid authentication method', 422));
        const foundEmail = await User.findOne({ email });
        if(foundEmail) return next(new HttpError('Validation Error', 'The Email Address You Entered Already Exists', 422));
        let hashedPassword = '';
        if(password) {
            const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            const passwordResult = password.match(passwordPattern);
            if(!passwordResult) return next(new HttpError('Authentication error', 'Please input a strong password that includes an alphabet, number and special character', 422));
            hashedPassword = await bcrypt.hash(password, 12);
        };
        const newUser = new User({ firstName, lastName, email: email || '', password: hashedPassword, githubId: githubId || '' });
        await newUser.save();
        const token = jwt.sign({ _id: newUser._id, firstName }, process.env.TOKEN_SECRET);
        const createdUser = await User.findById(newUser._id, { password: 0, githubId: 0 });
        res.status(201).json({ message: 'User Registered Successfully', user: { ...createdUser['_doc'], token } });
    } catch (err) {
        return next(new HttpError('Unable to register User'));
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password = "", githubId = "" } = req.body;
        if(!email && !githubId) return next(new HttpError('Validation Error', 'Please select an authentication method', 422));
        const foundUser = email ? await User.findOne({ email }) : await User.findOne({ githubId });
        if(!foundUser) return next(new HttpError('Validation Error', 'Invalid Login Credentials', 422));
        if(email) {
            const passwordCorrect = await bcrypt.compare(password, foundUser.password);
            if(!passwordCorrect) return next(new HttpError('Validation Error', 'Invalid Login Credentials', 422));
        };
        const token = jwt.sign({ _id: foundUser._id, firstName: foundUser.firstName }, process.env.TOKEN_SECRET);
        const loggedUser = { ...foundUser['_doc'], token };
        delete loggedUser.password;
        delete loggedUser.githubId;
        res.status(200).json({ message: 'User Logged In Successfully', user: loggedUser });
    } catch (err) {
        console.log(err);
        return next(new HttpError('Unable to login User'));
    }
};

exports.getAccessToken = async (req, res, next) => {
    try {
        const { code, path } = req.query;
        const redirectUri = `http://localhost:5173/${path}`;
        const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}&redirect_uri=${redirectUri}`;
        const { data } = await axios.post(`https://github.com/login/oauth/access_token${params}`);
        console.log(data);
        res.status(200).json(data);
    } catch (err) {
        res.json(err?.response?.data)
    }
};

exports.getUserData = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        const config = { headers: { 'Authorization': authHeader } };
        const { data } = await axios.get('https://api.github.com/user', config);
        console.lof(data);
        res.status(200).json(data);
    } catch (err) {
        res.json(err?.response?.data)
    }
}