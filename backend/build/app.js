"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const note_routes_1 = __importDefault(require("./routes/note.routes"));
const auth_1 = __importDefault(require("./middlewares/auth"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.setters();
        this.middlewares();
        this.routes();
    }
    setters() {
        this.app.set("port", process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use('/user', user_routes_1.default);
        this.app.use("/note", auth_1.default, note_routes_1.default);
    }
}
exports.default = new App().app;
