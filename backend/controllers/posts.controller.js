// import { use } from 'react';
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import Profile from '../models/profile.model.js';
import Post from '../models/posts.model.js'
// import { use } from 'react';

export const activeCheck=async(req,res)=>{
    return res.status(200).json({message:"Running"})
}
//create Post

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

export const getAllPosts=async(req,res)=>{
    try{
        const posts=await Post.find().populate('userID','name username email profilePicture')
        return res.json(posts);
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const deletePost=async(req,res)=>{
    const {token,post_id}=req.body;
    try{    
        const user=await User.findOne({token})
        .select("_id");

        if(!user) {

        return res.status(400).json("User not Found");
        }

        const post=await Post.findOne({_id:post_id});
        if(!post){
            return res.status(401).json({message:"Post was not found"});
        }
        if(post.userID.toString()!==user._id.toString()){
            return res.status(401).json({message:"Unauthorized"});
        }

        await Post.deletePost({_id:post_id});

        return res.json({message:"post deleted"});

    }catch(error){
        return res.status(500).json({message:error.message});
    }


}