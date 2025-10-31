import UserLayout from '@/layouts/UserLayout'
import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styles from './style.module.css'
// import dashboard from '../dashboard'

import { loginUser, registerUser } from '@/config/redux/action/authAction'
import { emptyMessage } from '@/config/redux/reducer/authReducer'

function loginComponent() {
 
  const authState=useSelector((state)=>state.auth)
  const router=useRouter();
  const dispath=useDispatch()
  const [userLoginMethod,setUserLoginMethod]=useState(false);

  const[email,setEmailAddress]=useState("");
  const[password,setPassword]=useState("");
  const[username,setUsername]=useState("");  
  const[name,setName]=useState("");   

  // const isLoginMethod=useState(false);
  useEffect(()=>{
    if(authState.loggedIn){
      router.push("/dashboard");
  }},[authState.loggedIn])


  useEffect(()=>{
    if(localStorage.getItem("token")){
      // router.push('/dashboard');
    } },[])

  useEffect(()=>{
    dispath(emptyMessage());
  
  },[userLoginMethod]);

  const handelRegister=()=>{
    console.log("register");
    dispath(registerUser({username,password,email,name}));
  }
  const handelLogin=()=>{
    console.log("login");
    dispath(loginUser({email,password}));
  }



  return (
    <UserLayout>
      <div className={styles.container}>
        
          <div className={styles.cardContainer}>

          <div className={styles.cardContainer_left}>

            <p className={styles.cardleft_heading}>{ userLoginMethod ? "Sing in":"Sing Up"}</p>
              <p style={{color:authState.isError ?"red":"green"}}>{authState.message.message}</p>
              <div className={styles.inputContainer}>
                    {!userLoginMethod && <div className={styles.inputRow}>
                  <input onChange={(e)=>setUsername(e.target.value)} className={styles.inputFiled}  type="text" placeholder='Username'/>
                  <input onChange={(e)=>setName(e.target.value)} className={styles.inputFiled}  type="text" placeholder='Name'/>
                </div>
                    }
                  <input onChange={(e)=>setEmailAddress(e.target.value)} className={styles.inputFiled}  type="text" placeholder='Email'/>

                  <input onChange={(e)=>setPassword(e.target.value)} className={styles.inputFiled}  type="text" placeholder='Password'/>
                
                
                
                <div onClick={()=>{
                  if(userLoginMethod){
                    handelLogin();
                  }else{
                    handelRegister();
                  }
                }} className={styles.buttonWithOutline}>
                  <p>{userLoginMethod ?"Sing In":"Sing Up"}</p>
               
                </div>  
              </div>
            
          </div>
          <div className={styles.cardContainer_right}>
           
            {userLoginMethod ? <p>Don't Have an Account</p>:<p>Already Have an Account</p>}
                 {/* <p>Already Have an Account</p> */}
            <div onClick={()=>{
                setUserLoginMethod(!userLoginMethod)
                }}  style={{color:"black",textAlign:'center'}} className={styles.buttonWithOutline}>
                  <p>{userLoginMethod ?"Sing up":"Sing in"}</p>
               
                </div>
            
            
          </div>
        </div>

      </div>
    </UserLayout>
  )

}

export default loginComponent
