import express from 'express';
import zod from 'zod'
import authMiddleware from '../middlewares/user.js';
import { Account } from '../database/mongoDb/db.js';
import mongoose from 'mongoose';

const accountRouter = express.Router();


const transferBody = zod.object({
    to: zod.string(),
    amount: zod.number()
})

accountRouter.get('/balance', authMiddleware, async (req, res) => {

    try {

        const account = await Account.findOne({
            userId: req.userId
        })

        return res.status(200).json({
            message: "Balance fetched succesfully",
            balance: account.balance
        })

    } catch (error) {
        res.status(500).json({
            message: "Can't fetch balance"
        })
    }

})

accountRouter.post('/transfer', authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    const { success } = transferBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Invalid inputs!"
        })
    }

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if (!account || account.balance < req.body.amount) {
        session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: req.body.to
    }).session(session);

    if (!toAccount) {
        session.abortTransaction();
        return res.status(404).json({
            message: "Invalid account!"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: req.body.amount
        }
    }).session(session);

    await Account.updateOne({
        userId: req.body.to
    }, {
        $inc: {
            balance: req.body.amount
        }
    })

    session.commitTransaction();

    res.status(200).json({
        message: "Transfer succesfull"
    })

})

export default accountRouter;