import express from 'express';
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import {userRouter} from './routes/userRoute.js'

export const app = express();

dotenv.config({
    path: "./config/config.env"
})

app.use(express.json({ limit: '500mb'}))
app.use(express.urlencoded({ 
    limit: '500mb', 
    extended: true 
}))

app.use(
    cors({
      origin: [process.env.LOCAL_URL, process.env.WEB_URL],
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
);

app.use(cookieParser());

app.use("/api/v1", userRouter)