import mongoose from 'mongoose'

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/fullstack")

mongoose.connection.once("open", () => {
    console.log("Conectado ao mongo")
})