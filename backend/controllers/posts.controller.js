// import { use } from 'react';
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import Profile from '../models/profile.model.js';
import Post from '../models/posts.model.js'
// import { use } from 'react';
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

//commit

export const commentPost=async(req,res)=>{
    const {token,post_id,commentBody}=req.body;
    try{
        const user=await User.findOne({token:token}).select("_id");
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        const post=await Post.findOne({
            _id:post_id
        })
        if(!post){
            return res.status(404).json({message:"post not found"})
        }

        const commit=new Comment({
            userID:user._id,
            postid:post_id,
            Comment:commentBody
        })

        await commit.save();
        return res.status(200).json({message:"commit added"});

    }catch{
        return res.status(500).json({message:error.message});
    }
}

export const get_comments_by_post=async(req,res)=>{
    const {post_id}=req.body;
    try {
        const post=await Post.findOne({_id:post_id});
        if(!post){
            return res.status(400).json({message:"Post not found"})
        }
        return res.status({comments:post.comments})

    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

export const delete_comment_of_user=async(req,res)=>{
    const{token,comment_id}=req.body;
    try{
        const user=await User.findOne({token:token}).select("._id");

        if(!user) {
            return res.status(400).json({message:"User not found"});
        }
        const comment=await Comment.findOne({
            "_id":comment_id
        })

        if(!comment){
            return res.status(401).json({message:"comment not found"});
        }

        if(comment.userID.toString()!==user._id.toString()){
            return res.status(401).json({message:"Unauthorized"})
        }

        await Comment.deletePost({"_id":comment_id});

        return res.status(200).json({message:"comment was deleted"});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const increment_like=async(req,res)=>{
    const {post_id}=req.body;
    try {
        const post=await Post.findOne({_id:post_id});
        if(!post){
            return res.status(400).json({message:"post not found"});

        }
        post.likes=post.likes+1;
        await post.save();
        return res.status(200).json({message:"likes increment like"});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}