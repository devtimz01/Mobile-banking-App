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
const account_enums_1 = require("../enums/account-enums");
const crypto_1 = __importDefault(require("crypto"));
class AccountService {
    constructor(_dataSource) {
        this.dataSource = _dataSource;
    }
    findByField(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: Object.assign({}, record),
                raw: true
            };
            return yield this.dataSource.fetchOne(query);
        });
    }
    createAccount(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountData = Object.assign(Object.assign({}, record), { balance: 0.00, status: account_enums_1.AccountStatus.ACTIVE });
            let account = yield this.createAccountNumber(accountData);
            return account;
        });
    }
    ;
    createAccountNumber(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const accountData = Object.assign({}, record);
            //cryptographically generate account number
            const generateAccountNumber = (num) => {
                let digit = '0123454789';
                let accountNumber = '';
                for (let i = 0; i < num; i++) {
                    const randomIndex = crypto_1.default.randomBytes(1)[0] % digit.length;
                    accountNumber += digit[randomIndex];
                }
                return accountNumber;
            };
            let validAccount = false;
            while (!validAccount) {
                accountData.accountnumber = generateAccountNumber(9);
                const data = yield this.findByField({ accountnumber: accountData.accountnumber });
                if (!data) {
                    validAccount = true;
                    break;
                }
            }
            return yield this.dataSource.create(accountData);
        });
    }
    ;
    findAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: { userId },
                raw: true
            };
            return yield this.dataSource.findAllAccount(query);
        });
    }
    findById(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: Object.assign({}, record),
                raw: true
            };
            return yield this.dataSource.fetchOne(query);
        });
    }
}
exports.default = AccountService;
