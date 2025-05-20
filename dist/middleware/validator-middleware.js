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
exports.Auth = exports.validator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = require("../routes/authRoute");
dotenv_1.default.config();
const validator = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield schema.validate(req.body, { abortEarly: false });
            next();
        }
        catch (err) {
            res.status(500).send("server error");
            return;
        }
    });
};
exports.validator = validator;
const Auth = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let token;
            if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
                token = req.headers.authorization.split(" ")[1];
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const user = yield authRoute_1.userService.findByField({ id: decoded.id });
                if (!user) {
                    throw new Error('user not found');
                }
                req.user = user;
                next();
            }
            else {
                throw new TypeError('bearer token not found');
            }
        }
        catch (err) {
            // logger.error(err)
            console.log(err);
            res.status(500).send("error authenticating user");
            return;
        }
    });
};
exports.Auth = Auth;
