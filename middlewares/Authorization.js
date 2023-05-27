require('dotenv').config();

const jwt = require('jsonwebtoken');

const DataAccessError = require('../errors/DataAccessError');

const { NEED_AUTH_MESSAGE } = require('../utils/constants');

const { JWT_KEY = 'some-secret-key' } = process.env;

class Authorization {
    constructor(jwtKey, handleBlockCheck) {
        this._jwtKey = jwtKey;

        this._handleBlockCheck = handleBlockCheck;

        this._jwt;
    }

    _checkTokenPresence = (req) => {
        this._jwt = req.cookies.jwt;
        if (!this._jwt) {
            throw new DataAccessError(NEED_AUTH_MESSAGE);
        }
    };

    _verifyToken = () => {
        try {
            this._payload = jwt.verify(this._jwt, JWT_KEY);
        } catch (err) {
            throw new DataAccessError(NEED_AUTH_MESSAGE);
        }
    };

    authorizeUser = async (req, res, next) => {
        try {
            this._checkTokenPresence(req, next);
            this._verifyToken(next);
            await this._handleBlockCheck({ id: this._payload.id });
            req.user = this._payload;
            next();
        } catch (err) {
            next(err);
        }
    };
}

module.exports = Authorization;
