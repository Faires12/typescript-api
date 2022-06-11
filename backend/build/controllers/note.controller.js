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
const note_services_1 = __importDefault(require("../services/note.services"));
class NoteController {
    createNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content } = req.body;
                if (!title || !content)
                    return res.status(400).json("Preencha todos os campos!");
                yield note_services_1.default.createNote(title, content, req.user.id);
                return res.status(200).json("Nota criada com sucesso!");
            }
            catch (error) {
                return res.status(500).json("Erro interno!");
            }
        });
    }
    getUserNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notes = yield note_services_1.default.getUserNotes(req.user.id);
                const notesFilter = [];
                notes.map(note => {
                    notesFilter.push({
                        title: note.title,
                        content: note.content,
                        createdAt: note.createdAt
                    });
                });
                return res.status(200).json(notesFilter);
            }
            catch (error) {
                return res.status(500).json("Erro interno!");
            }
        });
    }
}
exports.default = new NoteController();
