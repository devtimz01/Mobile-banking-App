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
const crypto_1 = __importDefault(require("crypto"));
const moment_1 = __importDefault(require("moment"));
//errm, what's my role in this now??
class TokenService {
    constructor(_dataSource) {
        this.tokenExpires = 5;
        this.tokenType = {
            FORGOT_PASSWORD: 'forgot password'
        };
        this.tokenStatus = {
            NOT_USED: 'not used',
            USED: 'used'
        };
        this.dataSource = _dataSource;
    }
    findTokenByField(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { where: Object.assign({}, record), raw: true };
            return yield this.dataSource.fetchOne(query);
        });
    }
    sendForgotPasswordToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = {
                key: email,
                type: this.tokenType.FORGOT_PASSWORD,
                status: this.tokenStatus.NOT_USED,
                expires: (0, moment_1.default)().add(this.tokenExpires, 'minute').toDate()
            };
            let token = yield this.createToken(tokenData);
            return token;
        });
    }
    createToken(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenData = Object.assign({}, record);
            let validToken = false;
            while (!validToken) {
                //cryptographically generate unique tokens
                const generateToken = (num) => {
                    let digit = '012345';
                    let code = '';
                    for (let i = 0; i < num; i++) {
                        const randomIndex = crypto_1.default.randomBytes(1)[0] % digit.length;
                        code += digit[randomIndex];
                    }
                    return code;
                };
                tokenData.code = generateToken(6);
                const isCodeExist = yield this.findTokenByField({ code: tokenData.code });
                if (!isCodeExist) {
                    validToken = true;
                    break;
                }
            }
            return this.dataSource.create(tokenData);
        });
    }
    updateOne(searchBy, record) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: Object.assign({}, searchBy),
                raw: true
            };
            yield this.dataSource.updateOne(query, record);
        });
    }
}
;
exports.default = TokenService;
