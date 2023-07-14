import express from "express"
import bcrypt from  "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const possibleUser = await User.findOne({ username: username })
    if (possibleUser) {
        return res.status(401).json({ error: 'Username has already been taken.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username: username,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user.' });
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid password.' })
    }

    const token = jwt.sign({ username: user.username, id: user.id }, 'your-secret-key')
    res.cookie("token", token)
        .status(200)
        .json({'message': 'Login successful!'})
})

export default router
