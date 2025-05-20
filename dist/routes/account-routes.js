"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_1 = __importDefault(require("../controllers/account"));
const account_info_service_1 = __importDefault(require("../service/account-info-service"));
const account_datasource_1 = __importDefault(require("../DataSource/account-datasource"));
const userAccount_validator_schema_1 = __importDefault(require("../validator/userAccount-validator-schema"));
const validator_middleware_1 = require("../middleware/validator-middleware");
const Router = express_1.default.Router();
const accountService = new account_info_service_1.default(new account_datasource_1.default());
const controller = new account_1.default(accountService);
Router.post('/createAccount', (0, validator_middleware_1.validator)(userAccount_validator_schema_1.default.userAccountSchema), (0, validator_middleware_1.Auth)(), (req, res) => {
    controller.createAccountNumber(req, res);
});
Router.get('/:id', (0, validator_middleware_1.Auth)(), (req, res) => {
    controller.findAccount(req, res);
});
Router.get('/findAllAccount', (0, validator_middleware_1.Auth)(), (req, res) => {
    controller.findAllAccount(req, res);
});
exports.default = Router;
