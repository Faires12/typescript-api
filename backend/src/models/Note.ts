import {model, Schema, Document} from 'mongoose'

export interface note extends Document{
    title: string;
    content: string;
    createdAt: string;
    user: string;
    updatedAt: string;
}

const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

export default model<note>("note", noteSchema)