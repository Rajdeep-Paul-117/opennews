import Article from '../models/article.js'
import Comment from '../models/comment.js'
import mongoose from 'mongoose'
import User from '../models/user.js'
export const addArticle = async (req, res) => {
    try {
        const newArticle = await Article.create({ ...req.body, userName: req.name, userId: req.id })
        const user = await User.findById(req.id)
        user.articles.push(newArticle._id)
        await User.findByIdAndUpdate(req.id, user)
        res.status(200).json(newArticle)
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message })
    }
}

export const editArticle = async (req, res) => {
    try {
        const { id } = req.params
        const { title, detail, image } = req.body
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send(`No article with id: ${id}`);
        const updatedArticle = await Article.findByIdAndUpdate(id, { title, detail, image }, { new: true })
        res.status(200).json(updatedArticle)
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message })
    }
}
export const getArticles = async (req, res) => {
    let query = {}
    let search = {}
    let page = 1

    if (req.query) {
        query = req.query
    }
    if (req.query.page) {
        page = req.query.page
        delete query.page
    }
    if (req.query.search) {
        search = { $text: { $search: req.query.search } }
        delete query.search
    }

    try {

        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT;

        const articles = await Article.find(search).sort(query).limit(LIMIT).skip(startIndex)
        res.status(200).json(articles)
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}

export const getArticleByID = async (req, res) => {
    try {
        const { id } = req.params
        const article = await Article.findById(id).populate("comments")
        res.status(200).json(article)
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}


export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send(`No article with id: ${id}`)
        await Article.findByIdAndDelete(id)
        const user = await User.findById(req.id)
        user.articles = user.articles.filter((Id) => Id != id)
        await User.findByIdAndUpdate(req.id, user)
        res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message })
    }
}

export const toggleLike = async (req, res) => {

    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send(`No post with id: ${id}`);
        const article = await Article.findById(id)

        const index = article.likes.findIndex((id) => (id == req.id))
        if (index === -1) {
            article.likes.push(req.id)
            article.top = article.top + 1
        }
        else {
            article.likes = article.likes.filter((id) => (id != req.id))
            article.top = Math.max(0, article.top - 1)
        }

        const updatedArticle = await Article.findByIdAndUpdate(id, article, { new: true })
        res.status(200).json(updatedArticle)
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message })
    }
}

export const addComment = async (req, res) => {
    try {
        const { id } = req.params
        const newComment = await Comment.create({ ...req.body, userName: req.name, userId: req.id })
        const article = await Article.findById(id)
        article.comments.push(newComment._id)

        const updatedArticle = await Article.findByIdAndUpdate(id, article, { new: true }).populate("comments")
        return res.status(200).json(updatedArticle)

    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message })
    }
}
export const editComment = async (req, res) => {
    try {
        const { id, cmntId } = req.params
        const updatedComment = await Comment.findByIdAndUpdate(cmntId, { ...req.body })
        const updatedArticle = await Article.findById(id).populate("comments")
        return res.status(200).json(updatedArticle)


    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message })
    }
}
export const deleteComment = async (req, res) => {
    try {
        const { id, cmntId } = req.params
        await Comment.findByIdAndDelete(cmntId)
        const article = await Article.findById(id)
        article.comments = article.comments.filter((id) => (id != cmntId))

        const updatedArticle = await Article.findByIdAndUpdate(id, article, { new: true }).populate("comments")
        return res.status(200).json(updatedArticle)
    } catch (error) {
        console.log(error)
        res.status(409).json({ message: error.message })
    }
}