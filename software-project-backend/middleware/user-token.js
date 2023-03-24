const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const userToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return next(new HttpError('Token validation failed', 'Please provide your authentication token', 403));
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const id = decodedToken._id.trim();
        const foundUser = await User.findById(id);
        if(!foundUser) return next(new HttpError('Token validation failed', 'You are not allowed to access the resources', 403));
        req.id = id;
        next();
    } catch (err) {
        return next(new HttpError('Unable to validate the agent token'));
    }
};

module.exports = userToken;