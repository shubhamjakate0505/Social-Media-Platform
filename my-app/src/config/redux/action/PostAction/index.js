const { clientServer } = require("@/config");
const { createAsyncThunk } = require("@reduxjs/toolkit");


export const getAllPosts=createAsyncThunk(
    "post/getAllPosts",
    async(_,thunkAPI)=>{
        try{
            const response=await clientServer.get('/posts')
             return thunkAPI.fulfillWithValue(response.data)
        }catch(err){
            return thunkAPI.rejectWithValue(err.response.data);
        }
    }
)


export const createPost=createAsyncThunk(
    "post/createPost",  
    async(userData,thunkAPI)=>{
        const{file,body}=userData;

        try{
            const fromData=new FormData();
            fromData.append('token',localStorage.getItem('token'))
            fromData.append('body',body)
            fromData.append('media',file)

            const response=await clientServer.post("/post",fromData,{
                headers:{
                    'Content-Type':'multipart/from-data'
                }
            });
            if(response.status==200){
                return thunkAPI.fulfillWithValue("Post uploaded")
            }else{
                return thunkAPI.rejectWithValue("post not uploaded")
            }
        }catch(err){
            return thunkAPI.fulfillWithValue(response.data);
        }
    }
)

export const deletePost=createAsyncThunk(
    "Post/deletePost",
    async(post_id,thunkAPI)=>{
        try{
            const response=await clientServer.delete("/delete_post",{
                data:{
                    token:localStorage.getItem("token"),
                    post_id:post_id.post_id
                }
            });
            return thunkAPI.fulfillWithValue(response.data)
        }catch(err){
            return thunkAPI.fulfillWithValue("something went wrong")
        }
    }
)

export const incrementPostLike=createAsyncThunk(
    "post/incrementLike",
    async(post,thunkAPI)=>{
    try{
        const response=await clientServer.post(`/increment_post_like`,{
            post_id : post.post_id
        })
    }catch(err){
        return thunkAPI.rejectWithValue(err.response.data.message);
    }
}

)

export const getAllComments=createAsyncThunk(
    "post/getAllComments",
    async(postData,thunkAPI)=>{
        try{
            const response=await clientServer.get("/get_comments",{
                params:{
                    post_id:postData.post_id
                }
            });
            return thunkAPI.fulfillWithValue({
                comments:response.data,
                post_id: postData.post_id
            })
        }catch(err){
            return thunkAPI.rejectWithValue("something went wrong");
        }
    }
)

export const postComment=createAsyncThunk(
    "post/postComment",
    async(CommentData,thunkAPI)=>{
        try{
            console.log({
            post_id:CommentData.post_id,
            body:CommentData.body 
            })
            const response=await clientServer.post("/comment",{
                token:localStorage.getItem("token"),
                post_id:CommentData.post_id,
                commentBody:CommentData.body
            });
            return thunkAPI.fulfillWithValue(response.data)

        }catch(err){
            return thunkAPI.rejectWithValue("something went wrong")
        }
    }
)