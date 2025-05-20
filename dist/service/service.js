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
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    constructor(_dataSource) {
        this.dataSource = _dataSource;
    }
    findByField(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {
                where: Object.assign({}, record),
                raw: true
            };
            return this.dataSource.fetchOne(query);
        });
    }
    ;
    createUser(record) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.dataSource.create(record);
        });
    }
    updateOne(searchBy, record) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = { where: Object.assign({}, searchBy),
                raw: true };
            yield this.dataSource.updateOne(query, record);
        });
    }
}
;
exports.default = UserService;
