const { Joi } = require('celebrate');

const { BASE_FRONTEND_URL } = require('./constants');

const validationConfig = {
    id: Joi.array().required(),
    block: Joi.boolean().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
};

const loggerConfig = {
    method: {
        error: 'errorLogger',
        request: 'logger',
    },
    file: {
        error: 'error.log',
        request: 'request.log',
    },
};

const corsConfig = {
    origin: BASE_FRONTEND_URL,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
    credentials: true,
};

const cookiesConfig = {
    httpOnly: true,
    sameSite: 'Lax',
    secure: true,
    path: '/',
    domain: BASE_FRONTEND_URL,
};

module.exports = {
    validationConfig,
    corsConfig,
    loggerConfig,
    cookiesConfig,
};
