const { celebrate, Joi } = require('celebrate');

class Validation {
    constructor(config) {
        this._config = config;
    }

    _getValidationKeys = (...keys) => {
        return keys.reduce((keys, key) => {
            keys[key] = this._config[key];
            return keys;
        }, {});
    };

    createRequestValidator = (...keys) => {
        return celebrate({
            body: Joi.object().keys(this._getValidationKeys(...keys)),
        });
    };
}

module.exports = Validation;
