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
const user_services_1 = __importDefault(require("services/user.services"));
class UserControllers {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, password } = req.body;
                if (!email || !name || !password)
                    return res.status(400).json("Preencha todos os campos!");
                const user = yield User_1.default.findOne({ email });
                if (user)
                    return res.status(400).json("Preencha todos os campos!");
                const newUser = yield user_services_1.default.createUser(email, name, password);
                res.json(newUser);
            }
            catch (error) {
                return res.status(500).json("Erro ao salvar usuário!");
            }
        });
    }
}
exports.default = new UserControllers;
