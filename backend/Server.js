import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import postRoutes from "./routes/post.routes.js"
import userRoutes from "./routes/user.routes.js"

dotenv.config();
const app=express();
app.use(cors());

app.use(express.json());
app.use(postRoutes);
app.use(userRoutes);



const start=async()=>{
        const connectDB=await mongoose.connect("mongodb+srv://shubhamjakate0505_db_user:12345@linkdin.xhqfshe.mongodb.net/?retryWrites=true&w=majority&appName=Linkdin")

        app.listen(9090,()=>{
            console.log("server is running on port 9090")
        })
}

start();