"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express_1.default.Router();
router.post("/register", user_controller_1.default.register);
router.post("/login", user_controller_1.default.login);
router.delete("/delete/:id", auth_1.default, user_controller_1.default.delete);
router.get("/", auth_1.default, user_controller_1.default.get);
exports.default = router;
