const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const Admin = require('../models/admin')
const Field = require('../models/field');

exports.register = async (req, res, next) => {
    try {
        const { email, name, password } = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const errorArray = errors.array();
            return next(new HttpError('Validation Error', errorArray[0].msg, 422));
        };
        const foundEmail = await Admin.findOne({ email });
        if(foundEmail) return next(new HttpError('Validation Error', 'The Email Address You Entered Already Exists', 422));
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        const passwordResult = password.match(passwordPattern);
        if(!passwordResult) return next(new HttpError('Authentication error', 'Please input a strong password that includes an alphabet, number and special character', 422));
        const hashedPassword = await bcrypt.hash(password, 12);
        const newAdmin = new Admin({ name, email, password: hashedPassword });
        await newAdmin.save();
        const token = jwt.sign({ _id: newAdmin._id, email }, process.env.TOKEN_SECRET);
        const foundAdmin = await Admin.findById(newAdmin._id, { password: 0 });
        res.status(201).json({ message: 'Admin Registered Successfully', admin: { ...foundAdmin['_doc'], token } });
    } catch (err) {
        return next(new HttpError('Unable to register admin'));
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const foundAdmin = await Admin.findOne({ email });
        if(!foundAdmin) return next(new HttpError('Validation Error', 'Invalid Login Credentials', 422));
        const isPasswordCorrect = await bcrypt.compare(password, foundAdmin.password);
        if(!isPasswordCorrect) return next(new HttpError('Validation Error', 'Invalid Login Credentials', 422));
        const token = jwt.sign({ _id: foundAdmin._id, email }, process.env.TOKEN_SECRET);
        const loggedAdmin = { ...foundAdmin['_doc'], token };
        delete loggedAdmin.password;
        res.status(200).json({ message: 'Admin Logged In Successfully', admin: loggedAdmin });
    } catch (err) {
        return next(new HttpError('Unable to login admin'));
    }
};

exports.addField = async (req, res, next) => {
    try {
        const { name } = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            const errorArray = errors.array();
            return next(new HttpError('Validation Error', errorArray[0].msg, 422));
        };
        const foundField = await Field.findOne({ name });
        if(foundField) return next(new HttpError('Validation Error', 'The Field You Entered Already Exists', 422));
        const newField = new Field({ name });
        await newField.save();
        const createdField = await Field.findById(newField._id);
        res.status(201).json({ message: 'Field Created Successfully', field: createdField['_doc'] });
    } catch (err) {
        return next(new HttpError('Unable to add field'));
    }
}