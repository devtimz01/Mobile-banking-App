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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const init_1 = __importDefault(require("../src/Database/init"));
dotenv_1.default.config();
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const account_routes_1 = __importDefault(require("./routes/account-routes"));
//import './types/express'; 
const SERVERPORT = process.env.SERVERPORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/user', authRoute_1.default);
app.use('/api/account', account_routes_1.default);
const server = function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield init_1.default;
        try {
            app.listen(SERVERPORT, () => __awaiter(this, void 0, void 0, function* () {
                console.log('server is running at port', SERVERPORT);
            }));
        }
        catch (err) {
            console.log(err);
        }
    });
};
server();
