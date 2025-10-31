
import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import Profile from '../models/profile.model.js';
// import { use } from 'react';
import fs from 'fs';
import PDFDocument from 'pdfkit'
import crypto from 'crypto';
import ConnectionRequest from '../models/connections.model.js';
// import { use } from 'react';
//register



const convertUserDataToPDF=async(userData)=>{
    const doc=new PDFDocument();

    const outputPath=crypto.randomBytes(32).toString("hex")+".pdf";
    const stream=fs.createWriteStream("uploads/"+outputPath);

    doc.pipe(stream);
    

    doc.image(`uploads/${userData.userID.profilePicture}`,{align:"center",width:100});
    doc.fontSize(14).text(`Name:${userData.userID.name}`);
    doc.fontSize(14).text(`Username:${userData.userID.username}`);
    doc.fontSize(14).text(`Email:${userData.userID.email}`);
    doc.fontSize(14).text(`Bio:${userData.userID.bio}`);
    doc.fontSize(14).text(`Current Position:${userData.currentPosition}`);

    doc.fontSize(14).text("Past Work")
    userData.pastWork.forEach((work,index)=>{
        doc.fontSize(14).text(`Company Name:${work.company}`);
        doc.fontSize(14).text(`Position:${work.position}`);
        doc.fontSize(14).text(`Years:${work.years}`);
    })

    doc.end();

    return outputPath

}
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

export const downloadProfile=async(req,res)=>{
    const user_id=req.query.id;
    const userProfile=await Profile.findOne({userID:user_id})
    .populate('userID','name username email profilePicture');

    let outputPath=await convertUserDataToPDF(userProfile);
    return res.json({"message":outputPath});
}

export const sendConnectionRequest=async(req,res)=>{
        const {token,connectionId}=req.body;

        try{
            const user=await User.findOne({token});
            if(!user) return res.status(400).json({message:"User Not Found"});

            const connectionUser=await User.findOne({_id:connectionId})

            if(!connectionUser) {
                return res.status(404).json({message:"connection User not found"});
            }

            const existingRequest=await ConnectionRequest.findOne({
                userID:user._id,
                connectionId:connectionUser._id
            })

            if(existingRequest){
                return res.status(400).json({message:"Request Already send"})
            }

            const request=new ConnectionRequest({
                userID:user._id,
                connectionId:connectionUser.id
            });

            await request.save();

            return res.json({message:"Request sent"})

        }catch(error){
            return res.send(500).json({message:error.message});
        }
}

export const getMyconnectionRequest=async(req,res)=>{
        const {token}=req.body;
        try {
            const user=await User.findOne({token})

            if(!user) {
                return res.status(400).json({message:"user not found"});
            }

            const connections=await ConnectionRequest.findOne({userID:user._id})
            .populate('connectionId','name username email profilePicture');

            return res.json({connections})
        } catch (error) {
            return res.status(500).json({message:error.message});
        }
}

export const whatareMyConnection=async(req,res)=>{
    
    const {token}=req.body;
    try {
        const user=await User.findOne({token})

            if(!user) {
                return res.status(400).json({message:"user not found"});
            }

            const connections=await ConnectionRequest.find({connectionId:user._id})
            .populate('userID','name username email profilePicture')

            return res.json(connections)
        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}


export const acceptConnectionRequest=async(req,res)=>{
    const {token,requestId,action_type}=req.body;
    try {   

        const user=await User.findOne({token})
        if(!user) {
            return res.status(400).json({message:"user not found"});
        }

        const connection=await ConnectionRequest.findOne({_id:requestId});
        if(!connection){
            return res.status(400).json({message:"connection not found"});
        }

        if(action_type==="accept"){
            connection.Status_accepted=true;
        }else{
            connection.Status_accepted=false;
        }

        await connection.save();

        return res.json({message:"Request updated"})
        
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}