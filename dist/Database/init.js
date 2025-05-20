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
const index_1 = __importDefault(require("./index"));
const user_schema_1 = __importDefault(require("../model/user-schema"));
const token_schema_1 = __importDefault(require("../model/token-schema"));
const account_schema_1 = __importDefault(require("../model/account-schema"));
const DbIntitialize = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        token_schema_1.default.sync({ alter: false });
        user_schema_1.default.sync({ alter: false });
        account_schema_1.default.sync({ alter: false });
        yield index_1.default.authenticate();
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = DbIntitialize();
