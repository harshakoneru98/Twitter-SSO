// Express application which will make handling requests

// For more reference on express middleware refer
// https://expressjs.com/en/guide/using-middleware.html

// Importing express package
const express = require('express');

// Executing the function stored in express variable
// And storing the result into app variable
const app = express();

// HTTP request logger middleware for node.js
const morgan = require('morgan');

// Cookie Parser for cookies
const cookieParser = require('cookie-parser');

// BodyParser - Node.js body parsing middleware.
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');

const authRoutes = require('./api/routes/authRoutes');

app.use(morgan('dev'));

app.use(cookieParser());

// Making Uploads folder static - Publically available
app.use('/uploads', express.static('uploads'));

// BodyParsing URLEncoded and JSON Formats
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handling CORS Errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
});

// Routes which should handle requests
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
