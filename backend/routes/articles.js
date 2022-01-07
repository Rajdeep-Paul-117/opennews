import express from "express";
import { addComment, editComment, deleteComment, addArticle, editArticle, getArticleByID, deleteArticle, getArticles, toggleLike } from '../controllers/article.js'
import { isCommentOwner, isArticleOwner, isLogedIn } from "../middleware/auth.js";
const router = express.Router()

router.get('/', getArticles)
router.get('/query', getArticles)
router.get('/:id', getArticleByID)
router.post('/', isLogedIn, addArticle)
router.put('/:id', isLogedIn, isArticleOwner, editArticle)
router.put('/:id/like', isLogedIn, toggleLike)
router.delete('/:id', isLogedIn, isArticleOwner, deleteArticle)

router.post('/:id/comment', isLogedIn, addComment)
router.put('/:id/comment/:cmntId', isLogedIn, isCommentOwner, editComment)
router.delete('/:id/comment/:cmntId', isLogedIn, isCommentOwner, deleteComment)



export default router