"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../Database/index"));
const accountModel = index_1.default.define('accountModel', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        unique: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    accountnumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    balance: {
        type: sequelize_1.DataTypes.DECIMAL(30, 2),
        allowNull: false,
        defaultValue: 0.00
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
    }
}, {
    timestamps: true,
    tableName: 'accountInfo',
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
});
exports.default = accountModel;
