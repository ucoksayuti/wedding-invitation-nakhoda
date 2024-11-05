import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Comment from './model.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());




app.get('/comments/all', async (req, res) => {
    try {
        const comments = await Comment.find({})
            .sort({ createdAt: -1 }) 
            .limit(6); 
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.post('/comment', async (req, res) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });
