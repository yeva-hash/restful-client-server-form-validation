import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import router from './routes/index.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || '';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/admin', router);

async function start() {
    try {
        await mongoose.connect(MONGO_URL); 

        app.listen(PORT, () => {
            console.log(`Starting on PORT: ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}

start();