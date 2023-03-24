const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const Admin = require('../models/admin');

const adminToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) return next(new HttpError('Token validation failed', 'Please provide your authentication token', 403));
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const id = decodedToken._id.trim();
        const foundAdmin = await Admin.findById(id);
        if(!foundAdmin) return next(new HttpError('Token validation failed', 'You are not allowed to access the resources', 403));
        req.id = id;
        next();
    } catch (err) {
        console.log(err);
        return next(new HttpError('Unable to validate the admin token'));
    }
};

module.exports = adminToken;