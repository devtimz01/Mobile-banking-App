"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../Database/index"));
const tokenModel = index_1.default.define('tokenModel', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    key: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    expires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    timestamps: true,
    tableName: "userToken",
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});
exports.default = tokenModel;
