"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_log_1 = __importDefault(require("../utils/index.log"));
class Account {
    constructor(_accountservice) {
        this.accountService = _accountservice;
    }
    ;
    createAccountNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = Object.assign({}, req.body);
                const newAccount = {
                    userId: params.user.id,
                    type: params.type
                };
                let account = yield this.accountService.createAccount(newAccount);
                return res.status(201).json({ account });
            }
            catch (err) {
                index_log_1.default.error(err);
                return res.status(201).send("server error");
            }
        });
    }
    findAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = Object.assign({}, req.params);
                const account = yield this.accountService.findById({ id: params.id });
                if (!account) {
                    throw new Error('invalid id');
                }
                return res.status(200).json({
                    account
                });
            }
            catch (err) {
                index_log_1.default.error(err);
                return res.status(500).send("server error");
            }
        });
    }
    findAllAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = Object.assign({}, req.body);
                const allAccount = yield this.accountService.findAll(params.user.id);
                if (!allAccount) {
                    return res.status(404).send("user account not found");
                }
                return res.status(200).json({ allAccount });
            }
            catch (err) {
                index_log_1.default.error(err);
                return res.status(500).send("server error");
            }
        });
    }
}
;
exports.default = Account;
