import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})
export default mongoose.model("Comment", commentSchema)