"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const note_controller_1 = __importDefault(require("../controllers/note.controller"));
const router = (0, express_1.Router)();
router.post("/create", note_controller_1.default.createNote);
router.get("/", note_controller_1.default.getUserNotes);
exports.default = router;
