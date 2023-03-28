const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev')); // for logging information about request and responses

//middleware for parsing cookies
app.use(cookieParser());

// express.json middleware for parsing JSON bodies of requests with content-type of application/json
app.use(express.json());

//several security middlewares

