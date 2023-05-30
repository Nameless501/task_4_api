const router = require('express').Router();

var cors = require('cors')

const Users = require('../controllers/Users');

const UserModel = require('../models/user');

const Validation = require('../middlewares/Validation');

const { validationConfig } = require('../utils/configs');

const validation = new Validation(validationConfig);

const users = new Users(UserModel);

router.get('/', users.getAll);

router.options(cors());

router.delete('/', [cors(), validation.createRequestValidator('id')], users.delete);

router.patch(
    '/',
    [cors(), validation.createRequestValidator('id', 'block')],
    users.toggleBlock
);

module.exports = router;
