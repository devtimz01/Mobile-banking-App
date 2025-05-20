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
const email_service_1 = __importDefault(require("../service/email-service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const moment_1 = __importDefault(require("moment"));
dotenv_1.default.config();
class Authentication {
    constructor(_userService, _tokenService) {
        this.userService = _userService;
        this.tokenService = _tokenService;
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, firstname, lastname, isEmailVerified, role, accountStatus } = req.body;
            try {
                const existingUser = yield this.userService.findByField({ email });
                if (existingUser) {
                    console.log("Existing user lookup result:", existingUser);
                    return res.status(401).send('user already exists');
                    //or use helper functions for route validation...
                }
                //create user
                const saltRounds = 10;
                const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
                const user = yield this.userService.createUser({
                    username,
                    email,
                    password: hashedPassword,
                    firstname,
                    lastname,
                    isEmailVerified,
                    role,
                    accountStatus
                });
                //jwt auth logic
                const token = jsonwebtoken_1.default.sign({
                    username: user.username,
                    email: user.email,
                    id: user.id,
                    role: user.role
                }, process.env.JWT_SECRET, { expiresIn: '30d' });
                return res.status(201).json({ user, token });
            }
            catch (err) {
                console.log(err);
                return res.status(500).send('server error');
            }
        });
    }
    ;
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userService.findByField({ email });
                if (!user) {
                    return res.send(404).send('user does not exist');
                }
                const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordMatch) {
                    return res.status(401).send('invalid credentials');
                }
                else {
                    //jwt auth logic
                    const token = jsonwebtoken_1.default.sign({
                        username: user.username,
                        email: user.email,
                        id: user.id,
                        role: user.role
                    }, process.env.JWT_SECRET, { expiresIn: '30d' });
                    return res.status(200).json({ user, token });
                }
            }
            catch (err) {
                return res.status(500).send('server error');
            }
        });
    }
    ;
    forgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                //send a forgotpassword token
                const user = yield this.userService.findByField({ email });
                if (!user) {
                    return res.status(404).send('user not found');
                }
                const token = yield this.tokenService.sendForgotPasswordToken(email);
                yield email_service_1.default.sendMail(email, token.code);
                return res.status(201).send('password reset mail sent');
            }
            catch (err) {
                return res.status(500).send('password rest mail not sent');
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = Object.assign({}, req.body);
                const isVerifiedToken = yield this.tokenService.findTokenByField({
                    key: params.email, code: params.code, status: this.tokenService.tokenStatus.NOT_USED, type: this.tokenService.tokenType.FORGOT_PASSWORD
                });
                if (!isVerifiedToken) {
                    return res.status(404).send('token not found');
                }
                if (isVerifiedToken && (0, moment_1.default)(isVerifiedToken.expires).diff((0, moment_1.default)(), 'minute') <= 0) {
                    return res.status(400).send('token expired');
                }
                let user = yield this.userService.findByField(params.email);
                if (!user) {
                    return res.status(404).send('user not found');
                }
                //update unexpired token data and queries
                const saltRounds = 10;
                let hashedPassword = yield bcrypt_1.default.hash(params.password, saltRounds);
                const updatedPasswordRecord = yield this.userService.updateOne({ id: user.id }, { password: hashedPassword });
                const updatedTokenRecord = yield this.tokenService.updateOne({ id: isVerifiedToken.id }, { status: this.tokenService.tokenStatus.USED });
                return res.status(201).json({
                    updatedPasswordRecord, updatedTokenRecord
                });
            }
            catch (err) {
                console.log(err);
                return res.status(500).send('server error');
            }
        });
    }
}
;
exports.default = Authentication;
