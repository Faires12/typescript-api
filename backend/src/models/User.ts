import {model, Schema, Document} from 'mongoose'
import bcrypt from 'bcrypt'

export interface user extends Document {
    email: string,
    name: string,
    password: string,
    encryptPassword(password: string) : Promise<string>,
    comparePassword(password: string) : Promise<boolean>
}

const userSchema = new Schema({
    email: {
        required: true,
        unique: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
}, {
    timestamps: true
})

userSchema.methods.encryptPassword = async function(password : string) : Promise<string> {
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)
    return encryptedPassword
}

userSchema.methods.comparePassword = async function(password: string) : Promise<boolean> {
    const comparision = await bcrypt.compare(password, this.password)
    return comparision
}

export default model<user>('user', userSchema)