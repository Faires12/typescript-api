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
const User_1 = __importDefault(require("../models/User"));
class UserServices {
    createUser(email, name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = new User_1.default({
                    name,
                    email,
                    password
                });
                user.password = yield user.encryptPassword(password);
                yield user.save();
                return user;
            }
            catch (error) {
                throw Error("Erro ao salvar usuário!");
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ email });
                return user;
            }
            catch (error) {
                throw Error("Erro ao encontrar usuário!");
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield User_1.default.findByIdAndDelete(id);
            }
            catch (error) {
                throw Error("Erro ao encontrar usuário!");
            }
        });
    }
}
exports.default = new UserServices();
