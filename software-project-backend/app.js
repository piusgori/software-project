const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const mainRoute = require('./routes/main');
const adminRoute = require('./routes/admin');
const authRoute = require('./routes/auth');

const HttpError = require('./models/http-error');

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");
    next();
});

app.use(mainRoute);
app.use('/admin', adminRoute);
app.use('/auth', authRoute);

app.use((req, res, next) => {
    throw new HttpError('The page you are looking for could not be found', null, 404);
});

app.use((error, req, res, next) => {
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error has occured', content: error.content || null });
});

mongoose.set('strictQuery', false).connect(process.env.MONGO_URL).then(() => {
    app.listen(process.env.PORT || 8000, () => { console.log('Server Started') });
    console.log('Database connected');
})