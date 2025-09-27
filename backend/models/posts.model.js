import mongoose from "mongoose";

const PostSchema=mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    body:{
        type:String,
        required:true

    },
    likes:{
         type:Number,
        default:0

    },
    createdAt:{
         type:Date,
        default:Date.now

    },
    updatedAt:{
         type:String,
        default:Date.now

    },
    media:{
        type:String,
        default:''

    },
    active:{
        type:Boolean,
        default:''

    },
    fileType:{

    }
});

const Post=mongoose.model("Post",PostSchema)

export default Post;