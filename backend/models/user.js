import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    articles: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article"
        }],
        default: []
    }
})
export default mongoose.model("User", userSchema)