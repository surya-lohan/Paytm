import express from 'express';
import zod from 'zod';
import jwt from 'jsonwebtoken'
import User, { Account } from '../database/mongoDb/db.js';
import authMiddleware from '../middlewares/user.js';
const userRouter = express.Router();

const signupBody = zod.object({
    username: zod.email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string()
})

const signinBody = zod.object({
    username: zod.email(),
    password: zod.string()

})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
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

    const account = await Account.create({
        userId: userId,
        balance: Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, process.env.JWT_SECRET || "thisissecret")

    res.json({
        message: "User created successfully",
        token: token,
        userId: userId
    })

})

userRouter.post('/signin', async (req, res) => {

    try {
        const { success } = signinBody.safeParse(req.body);

        if (!success) {
            return res.status(411).json({
                message: "Invalid inputs!"
            })
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found!"
            })
        }

        const userId = user._id;

        const token = jwt.sign({
            userId
        }, process.env.JWT_SECRET || "thisissecret");

        if (!token) {
            return res.status(411).json({
                message: "Something went wrong!"
            })
        }

        return res.status(200).json({
            message: "Sign in succesfull",
            token: token
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error while signing up!",
            error: error
        })
    }



})

userRouter.put('/update', authMiddleware, async (req, res) => {

    const { success } = updateBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Invalid inputs!"
        })
    }

    try {

        await User.updateOne({
            _id: req.userId
        }, {
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.firstName
        })

        return res.status(200).json({
            message: "User updated succesfully",
        })

    } catch (error) {
        return res.status(500).json({
            message: "Can't update user",
            error: error
        })
    }

})

userRouter.get('/bulk', async (req, res) => {

    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [{
                firstName: filter
            }, {
                lastName: filter
            }]
        })


        return res.status(200).json({
            user: users.map((user) => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            }))
        })

    } catch (error) {
        return res.status(500).json({
            message: "Can't find the user"
        })
    }

})

export default userRouter;