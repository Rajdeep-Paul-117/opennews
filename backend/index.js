import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.js'
import articleRouter from './routes/articles.js'

dotenv.config()
const app = express();
app.use(express.json({ limit: '50mb' }))
app.use(cors())

app.use('/user', userRouter)
app.use('/article', articleRouter)

const URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((e) => console.log(e))

//mongoose.set('useFindAndModify', false);