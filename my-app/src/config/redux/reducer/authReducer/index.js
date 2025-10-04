// const { createSlice } = require("@reduxjs/toolkit");
// const { default: build } = require("next/dist/build");
// const { connection } = require("next/server");
// const { loginUser, registerUser } = require("../../action/authAction");

import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../action/authAction";
const initialState={
    user:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    loggedIn:false,
    message:"",
    profileFetched:false,
    connection:[],
    connectionRequest:[]
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        reset:()=>
            initialState,
            handelLoginUser: (state)=>{
                state.message="hello"
            

        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true
            state.message="Knocking the door ..."
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.loggedIn=true,
            state.message="Login is Successful"
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.message=action.payload
        })
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true,
            state.message="Registering you.."

        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.isError=false,
            state.isSuccess=true,
            state.loggedIn=true,
            state.message="Register is Successful"  
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false,
            state.isError=true,
            state.message=action.payload
        })
    }
})

export default authSlice.reducer