const { DATA_UPDATED_CODE } = require('../utils/constants');

class Users {
    constructor(userModel) {
        this._userModel = userModel;
    }

    getAll = (req, res, next) => {
        this._userModel
            .findAll({
                attributes: [
                    'name',
                    'email',
                    'id',
                    'block',
                    'createdAt',
                    'lastLoginAt',
                ],
            })
            .then((users) => res.send(users))
            .catch(next);
    };

    delete = (req, res, next) => {
        const { id } = req.body;
        this._userModel
            .destroy({ where: { id } })
            .then(() => res.sendStatus(DATA_UPDATED_CODE))
            .catch(next);
    };

    toggleBlock = (req, res, next) => {
        const { id, block } = req.body;
        this._userModel
            .update({ block }, { where: { id } })
            .then(() => res.sendStatus(DATA_UPDATED_CODE))
            .catch(next);
    };
}

module.exports = Users;
