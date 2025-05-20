"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const express_1 = __importDefault(require("express"));
const service_1 = __importDefault(require("../service/service"));
const datasource_1 = __importDefault(require("../DataSource/datasource"));
const auth_1 = __importDefault(require("../controllers/auth"));
const token_datasource_1 = __importDefault(require("../DataSource/token-datasource"));
const tokenService_1 = __importDefault(require("../service/tokenService"));
const Router = express_1.default.Router();
exports.userService = new service_1.default(new datasource_1.default);
const tokenService = new tokenService_1.default(new token_datasource_1.default);
const controller = new auth_1.default(exports.userService, tokenService);
Router.post('/signup', (req, res) => {
    controller.register(req, res);
});
Router.post('/login', (req, res) => {
    controller.login(req, res);
});
Router.post('/forgotpassword', (req, res) => {
    controller.forgotPassword(req, res);
});
Router.post('/resetpassword', (req, res) => {
    controller.resetPassword(req, res);
});
exports.default = Router;
