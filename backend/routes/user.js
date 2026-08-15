import express from 'express';
import zod from 'zod';
import jwt from 'jsonwebtoken'
import User from '../database/mongoDb/db.js';
const userRouter = express.Router();

const signupBody = zod.object({
    username: zod.email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})


userRouter.post('/signup', async (req, res) => {

    const { success } = signupBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    }, process.env.JWT_SECRET || "thisissecret")

    res.json({
        message: "User created successfully",
        token: token
    })

})

export default userRouter;