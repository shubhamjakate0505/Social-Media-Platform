//**
/* Steps for state Manegement   
/* submit action
/*handel action in its reducer
/* register Here -> reducer


//  */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer"
import PostReducer from "./reducer/PostReducer"
export const store=configureStore({
    reducer:{
        auth:authReducer,
        posts:PostReducer,
    }
})