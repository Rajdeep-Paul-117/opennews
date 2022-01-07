import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signIn = async (req, res) => {

    const { email, password } = req.body
    try {

        const oldUser = await User.findOne({ email })
        if (!oldUser)
            return res.status(400).json({ message: "Invalid Credentials" })

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid Credentials" })

        const secret = process.env.JWT_SECRET
        const token = jwt.sign({ id: oldUser._id, name: oldUser.name }, secret, { expiresIn: "1h" })
        res.status(200).json({ user: oldUser, token });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong Please Try Again Later" })
    }
}

export const signUp = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const oldUser = await User.findOne({ email })
        if (oldUser)
            return res.status(400).json({ message: "User Already exist" })

        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ name, email, password: hashedPassword })
        const secret = process.env.JWT_SECRET
        const token = jwt.sign({ id: result._id, name: result.name }, secret, { expiresIn: "1h" })
        res.status(201).json({ user: result, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong Please Try Again Later" })
    }
}

export const googleLogIn = async (req, res) => {
    const { name, email } = req.body.profileObj
    try {
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            const secret = process.env.JWT_SECRET
            const token = jwt.sign({ id: oldUser._id, name: oldUser.name }, secret, { expiresIn: "1h" })
            return res.status(200).json({ user: oldUser, token });
        }

        const decodedData = jwt.decode(req.body.tokenId)
        const password = decodedData.sub + decodedData.email
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({ name, email, password: hashedPassword })
        const secret = process.env.JWT_SECRET
        const token = jwt.sign({ id: result._id, name: result.name }, secret, { expiresIn: "1h" })
        res.status(201).json({ user: result, token })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong Please Try Again Later" })
    }
}

export const getProfile = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id).populate('articles')
        user.email = ""
        user.password = ""
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong Please Try Again Later" })
    }
}