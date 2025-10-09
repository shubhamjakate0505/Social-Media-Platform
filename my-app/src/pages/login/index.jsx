import UserLayout from '@/layouts/UserLayout'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styles from './style.module.css'

function loginComponent() {
 
  const authState=useSelector((state)=>state.auth)
  const router=useRouter();
  const [userLoginMethod,setUserLoginMethod]=useState(false);

  // const isLoginMethod=useState(false);
  useEffect(()=>{
    if(authState.loggedIn){
      router.push("/home");
  }})




  return (
    <UserLayout>
      <div className={styles.container}>
          <div className={styles.cardContainer}>
          <div className={styles.cardContainer_left}>
            <p className={styles.cardleft_heading}>{ userLoginMethod ? "Sing in":"Sing Up"}</p>

              <div className={styles.inputContainer}>
                <div className={styles.inputRow}>
                  <input  className={styles.inputFiled}  type="text" placeholder='Username'/>
                  <input  className={styles.inputFiled}  type="text" placeholder='Name'/>
                </div>
                  <input  className={styles.inputFiled}  type="text" placeholder='Email'/>

                  <input  className={styles.inputFiled}  type="text" placeholder='Password'/>
                <div className={styles.buttonWithOutline}>
                  <p>{userLoginMethod ?"Sing In":"Sing Up"}</p>
                </div>
              </div>
            
          </div>
          <div className={styles.cardContainer_right}></div>
        </div>

      </div>
    </UserLayout>
  )

}

export default loginComponent
