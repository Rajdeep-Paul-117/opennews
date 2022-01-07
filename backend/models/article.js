import mongoose from 'mongoose'

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    detail: {
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    likes: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        default: []
    },
    top: {
        type: Number,
        default: 0
    },
    comments: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
        default: []
    }
})
articleSchema.index({ '$**': 'text' })
export default mongoose.model("Article", articleSchema)