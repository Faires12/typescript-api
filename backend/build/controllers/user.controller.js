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
const user_services_1 = __importDefault(require("../services/user.services"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserControllers {
    register(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, name, password } = req.body;
                if (!email || !name || !password)
                    return res.status(400).json("Preencha todos os campos!");
                const user = yield user_services_1.default.findByEmail(email);
                if (user)
                    return res.status(400).json("Usuário já cadastrado!");
                const newUser = yield user_services_1.default.createUser(email, name, password);
                const token = yield jsonwebtoken_1.default.sign({ id: newUser._id }, (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : "");
                res.json(token);
            }
            catch (error) {
                return res.status(500).json("Erro ao salvar usuário!");
            }
        });
    }
    login(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password)
                    return res.status(400).json("Preencha todos os campos!");
                const user = yield user_services_1.default.findByEmail(email);
                if (!user)
                    return res.status(400).json("Usuário não encontrado!");
                if (!(yield user.comparePassword(password)))
                    return res.status(400).json("Senhas não coincidem!");
                const token = yield jsonwebtoken_1.default.sign({ id: user._id }, (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : "");
                res.json(token);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json("Erro ao salvar usuário!");
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield User_1.default.findById(req.user.id);
                if (!user)
                    return res.status(500).json("Erro interno!");
                if (user._id != id)
                    return res.status(400).json("Apenas o usuário pode se deletar!");
                yield user_services_1.default.deleteUser(id);
                return res.status(200).json("Usuário deletado com sucesso!");
            }
            catch (error) {
                return res.status(500).json("Erro ao salvar usuário!");
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findById(req.user.id);
                if (!user)
                    return res.status(500).json("Erro interno!");
                return res.status(200).json({
                    email: user.email, name: user.name
                });
            }
            catch (error) {
                return res.status(500).json("Erro ao salvar usuário!");
            }
        });
    }
}
exports.default = new UserControllers();
