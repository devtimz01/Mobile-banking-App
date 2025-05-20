"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dialect = (_a = process.env.DB_DIALECT) !== null && _a !== void 0 ? _a : "mysql";
const host = process.env.DB_HOST;
const port = parseInt(process.env.PORT);
const sequelize = new sequelize_1.Sequelize(database, username, password, {
    dialect,
    host,
    port,
    logging: false
});
exports.default = sequelize;
