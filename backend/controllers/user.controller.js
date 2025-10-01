
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import Profile from '../models/profile.model.js';
// import { use } from 'react';
import crypto from 'crypto';
// import { use } from 'react';
//register
export const register=async(req,res)=>{
   try{

    const {name,email,password,username}=req.body;
    if(!name || !email ||!password||!username) return res.status(400).json({message:"All filed are Requied"});


    const user=await User.findOne({
        email
    })

    if(user) return res.status(400).json({message:"User already exits"});

    const hashedPassword=await bcrypt.hash(password,10);

    const newUser=new User({
        name,
        email,
        password:hashedPassword,
        username
    })

    await newUser.save();

    const profile=new Profile({
        userID:newUser._id
    })

    await profile.save()

    return res.json({message:"User created"})
   }catch(error){
    return res.status(500).json({message:error.message});
   }
}
///login route
export const login=async(req,res)=>{
        try{
            const {email,password}=req.body;
            
            if(!email || !password)return res.status(500).json({message:"All filed are Requid"});
            
            const user=await User.findOne({
            email
        });
         
        if(!user) return res.status(404).json({message:"User does not exits"});

        const isMatch =await bcrypt.compare(password,user.password);
        if(!isMatch) res.send(400).json({message:"Invalide"});

        const token=crypto.randomBytes(32).toString("hex");

        await User.updateOne({_id:user._id},{token});

        return res.json({token});
        }catch(error){
            return res.status(500).json({message:error.message});
        }

       
}
//update Profile picture {img}
export const uploadProfilePicture=async (req,res)=>{
    const {token}=req.body; 
    try{

        const user =await User.findOne({token:token})
        if(!user) return res.status(400).json({message:"user not found"});
        user.profilePicture=req.file.filename;
        await user.save();

        return res.json({message:"Profile picture updated"})
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}
//for update Profile {bio,education,abot,etc}
export const updateUserProfile=async(req,res)=>{
    try{
        const {token, ...newUserData}=req.body;
        const user=await User.findOne({token:token});

        if(!user) return res.status(500).json({message:"User not found"});

        const{username,email}=newUserData;
        const existingUser=await User.findOne({$or:[{username},{email}]});

        if(existingUser){
            if(existingUser || String(existingUser._id)!==String(user._id)){
                return res.status(400).json({message:"User alread exits"});
            }
        }

        Object.assign(user,newUserData);

        return res.json({message:"User update"})
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}

export const getUserAndProfile=async(req,res)=>{
    try{
        const {token, ...newUserData}=req.body;
        const user=await User.findOne({token:token});

        if(!user) return res.status(500).json({message:"User not found"});


        const userProfile=await Profile.findOne({userID:user._id})
        .populate('userID','name email username profilePicture');
        return res.json(userProfile);
    }catch(error){
        return res.status(500).json({message:error.message});
        
    }
}

export const updateProfileData=async(req,res)=>{
    try{
        const {token,...newProfileData}=req.body;
        const userProfile =await User.findOne({token:token});
        if(!userProfile) return res.send(400).json({message:"User Not Found"});

        const Profile_to_update=await Profile.findOne({userID:userProfile._id});
        Object.assign(Profile_to_update,newProfileData);
        await Profile_to_update.save();
        return res.json({message:"profile updated"});


    }catch(error){
        return res.send(500).json({message:error.message});
    }
}

export const getAllUserProfile=async(req,res)=>{
    try {
        const profiles=await Profile.find().populate('userID','name username email profilePicture');
        return res.json({profiles});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}