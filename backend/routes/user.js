import express from 'express'
import { signIn, signUp, googleLogIn, getProfile } from '../controllers/user.js'
const router = express.Router()

router.get('/:id', getProfile)
router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/googlelogin', googleLogIn)

export default router