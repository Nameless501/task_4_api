const router = require('express').Router();

require('dotenv').config();

const NotFoundError = require('../errors/NotFoundError');

const Authentication = require('../controllers/Authentication');

const Authorization = require('../middlewares/Authorization');

const UserModel = require('../models/user');

const Validation = require('../middlewares/Validation');

const { validationConfig } = require('../utils/configs');

const { JWT_KEY } = process.env;

const authentication = new Authentication(UserModel, JWT_KEY);

const authorization = new Authorization(JWT_KEY, authentication.checkUserBlock);

const validation = new Validation(validationConfig);

router.post(
    '/signup',
    validation.createRequestValidator('name', 'email', 'password'),
    authentication.signUp
);

router.post(
    '/signin',
    validation.createRequestValidator('email', 'password'),
    authentication.signIn
);

router.get(
    '/authorization',
    authorization.authorizeUser,
    authentication.authorizeUser
);

router.post('/signout', authorization.authorizeUser, authentication.signOut);

router.use('/users', authorization.authorizeUser, require('./users'));

router.use((req, res, next) => next(new NotFoundError()));

module.exports = router;
