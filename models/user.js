const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();

const { DB_URL, DB_USERNAME, DB_NAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_URL,
    dialect: 'mysql',
    define: {
        timestamps: true,
        updatedAt: false,
        freezeTableName: true,
    },
});

const UserModel = sequelize.define('UsersData', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    block: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    lastLoginAt: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
    },
});

UserModel.sync();

module.exports = UserModel;
