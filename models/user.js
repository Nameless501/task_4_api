const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config();

const { MYSQLHOST, MYSQLUSER, MYSQLDATABASE, MYSQLPASSWORD, MYSQLPORT } =
    process.env;

const sequelize = new Sequelize(MYSQLDATABASE, MYSQLUSER, MYSQLPASSWORD, {
    dialect: 'mysql',
    dialectOptions: {
        host: MYSQLHOST,
        port: MYSQLPORT,
    },
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
