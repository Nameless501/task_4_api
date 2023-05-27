const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const DataAccessError = require('../errors/DataAccessError');

const ConflictError = require('../errors/ConflictError');

const ForbiddenError = require('../errors/ForbiddenError');

const { USER_IS_BLOCKED_MESSAGE, CREATED_CODE } = require('../utils/constants');

const { UniqueConstraintError } = require('sequelize');

class Authentication {
    constructor(userModel, jwtKey) {
        this._userModel = userModel;

        this._jwtKey = jwtKey;
    }

    _checkEmailConflict = (err, next) => {
        next(err instanceof UniqueConstraintError ? new ConflictError() : err);
    };

    _deletePassword = (user) => {
        user.password = undefined;
        return user;
    };

    signUp = (req, res, next) => {
        const { name, password, email } = req.body;
        bcrypt
            .hash(password, 10)
            .then((hash) =>
                this._userModel.create({
                    name,
                    email,
                    password: hash,
                })
            )
            .then(this._deletePassword)
            .then((user) => res.status(CREATED_CODE).send(user))
            .catch((err) => this._checkEmailConflict(err, next));
    };

    _updateLastLoginTime = (user) =>
        this._userModel
            .update({ lastLoginAt: new Date() }, { where: { id: user.id } })
            .then(() => user);

    _setJwtCookie = (user, res) => {
        const token = jwt.sign({ id: user.id }, this._jwtKey, {
            expiresIn: '7d',
        });
        res.cookie('jwt', token, {
            // httpOnly: true,
            // sameSite: 'none',
            // secure: NODE_ENV === 'production',
        });
        return user;
    };

    _compareUserPassword = (user, password) =>
        bcrypt.compare(password, user.password).then((matched) => {
            if (!matched) {
                throw new DataAccessError();
            }
            return user;
        });

    _findUser = (param) =>
        this._userModel.findOne({ where: param }).then((user) => {
            if (!user) {
                throw new DataAccessError();
            }
            return user;
        });

    checkUserBlock = (param) =>
        this._findUser(param).then((user) => {
            if (user.block) {
                throw new ForbiddenError(USER_IS_BLOCKED_MESSAGE);
            }
            return user;
        });

    signIn = (req, res, next) => {
        this.checkUserBlock({ email: req.body.email })
            .then((user) => this._compareUserPassword(user, req.body.password))
            .then(this._updateLastLoginTime)
            .then((user) => this._setJwtCookie(user, res))
            .then(this._deletePassword)
            .then((user) => res.send(user))
            .catch(next);
    };
}

module.exports = Authentication;
