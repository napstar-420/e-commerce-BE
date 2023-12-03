require('dotenv').config();
const express = require('express');
const logger = require('morgan')('dev');
const debug = require('debug')('myapp:server');
const cookieParser = require('cookie-parser');
const session= require('express-session');
const { v4: uuidv4 } = require('uuid');
const router = require('./routes/router');

/**
 * Creating App
 */

const app = express();

/**
 * Adding middlewares
 */

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}));

/**
 * Initializing Router
 */

app.use('/', router);

/**
 * Initializing App
 */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    debug(`App is listening on port http://localhost:${process.env.PORT}`);
})