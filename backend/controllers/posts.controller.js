// import { use } from 'react';
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import Profile from '../models/profile.model.js';
import Post from '../models/posts.model.js'

export const activeCheck=async(req,res)=>{
    return res.status(200).json({message:"Running"})
}

export const createPost=async(req,res)=>{
    const {token}=req.body;
    try{
        const user=await User.findOne({token});
        if(!user) return res.status(400).json({message:"User not Found"});

        const post=new Post({
            userID:user._id,
            body:req.body.body,
            media:req.file !=undefined ?req.file.filename:"",
            filetypes:req.file !=undefined ? req.file.mimetype.split("/")[1] :"",
            active: req.body.active === "true" || req.body.active === true
        })

        await post.save();

        return res.status(200).json({message:"Post created"});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}