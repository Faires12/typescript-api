import express, {Application} from 'express'
import cors from 'cors'
import UserRoutes from './routes/user.routes'
import NoteRoutes from './routes/note.routes'
import auth from './middlewares/auth'

class App{
    app : Application

    constructor(){
        this.app = express()
        this.setters()
        this.middlewares()
        this.routes()
    }

    setters(){
        this.app.set("port", process.env.PORT || 3000)
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
    }

    routes(){
        this.app.use('/user', UserRoutes)
        this.app.use("/note", auth, NoteRoutes)
    }

}

export default new App().app