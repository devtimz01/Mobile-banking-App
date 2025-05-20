"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../Database/index"));
const sequelize_1 = require("sequelize");
const UserModel = index_1.default.define('UserModel', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
        defaultValue: 'guest_user'
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'customer'
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    isEmailVerified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    accountStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'guest_user'
    }
}, { timestamps: true,
    tableName: 'users',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});
exports.default = UserModel;
