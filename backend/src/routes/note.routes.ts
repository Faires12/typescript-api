import express, { Router } from 'express'
import noteController from '../controllers/note.controller'

const router : Router = Router()

router.post("/create", noteController.createNote)

router.get("/", noteController.getUserNotes)

export default router