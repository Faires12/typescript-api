import {Request, Response} from 'express'
import NoteServices from '../services/note.services'

interface filterType {
    title: string;
    content: string;
    createdAt: string
}

class NoteController{
    async createNote(req : Request, res : Response){
        try {
            const {title, content} = req.body

            if(!title || !content)
                return res.status(400).json("Preencha todos os campos!")
            
            await NoteServices.createNote(title, content, req.user.id)
            return res.status(200).json("Nota criada com sucesso!")
        } catch (error) {
            return res.status(500).json("Erro interno!")
        }
    }

    async getUserNotes(req : Request, res : Response){
        try {
            const notes = await NoteServices.getUserNotes(req.user.id)
            const notesFilter : filterType[] = []

            notes.map(note => {
                notesFilter.push({
                    title: note.title,
                    content: note.content,
                    createdAt: note.createdAt
                })
            })
            return res.status(200).json(notesFilter)
        } catch (error) {
            return res.status(500).json("Erro interno!")
        }
    }
}

export default new NoteController()