import Note, { note } from "../models/Note"

class NoteServices{
    async createNote(title : string, content : string, userID : string){
        try {
            const newNote : note = new Note({
                title,
                content,
                user: userID
            })

            await newNote.save()
        } catch (error) {
            throw Error("Erro interno")
        }
    }

    async getUserNotes(userID : string){
        try {
            const notes = await Note.find({user: userID})
            return notes
        } catch (error) {
            throw Error("Erro interno")
        }
    }
}

export default new NoteServices()