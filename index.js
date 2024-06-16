import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import User from "./model/user.js";
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_CONNECTION_STRING);

const router = express.Router();
app.use(express.json());
app.use(router);

router.post('/user/bulk', async (req, res) => {
    try {
        const data = req.body;
        const operations = data.map(user => ({
            updateOne: {
                filter: { email: user.email },
                update: { $set: user },
                upsert: true
            }
        }))
        await User.bulkWrite(operations);
        res.status(201).json({ message: 'Success' });
    } catch (error) {
        return res.status(400).json({ message: 'Bad Request', error: error.message });
    }
});

router.get('/user', async (req, res) => {
    try {
        const { email } = req.query;
        const getUserByEmail = await User.find({ email: email });
        res.status(201).json({ message: 'Success', data: getUserByEmail });
    } catch (error) {
        return res.status(400).json({ message: 'Bad Request', error: error.message });
    }
});


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});