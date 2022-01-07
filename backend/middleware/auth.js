import jwt from 'jsonwebtoken'
import Article from '../models/article.js'
import Comment from '../models/comment.js';

export const isLogedIn = async (req, res, next) => {

    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (token) {
            const decodedData = jwt.verify(token, process.env.JWT_SECRET)
            req.id = decodedData.id
            req.name = decodedData.name
            next()
        }
        else {
            return res.status(400).json({ message: "Unatuthorized" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
export const isArticleOwner = async (req, res, next) => {

    try {
        const { id } = req.params
        const article = await Article.findById(id)
        if (article.userId == req.id)
            next()
        else
            return res.status(400).json({ message: "Unatuthorized" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
export const isCommentOwner = async (req, res, next) => {
    try {
        const { cmntId } = req.params
        const comment = await Comment.findById(cmntId)
        if (comment.userId == req.id) {
            next()
        }
        else {
            return res.status(400).json({ message: "Unatuthorized" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}