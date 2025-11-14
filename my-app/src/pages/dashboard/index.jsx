import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getAllPosts } from '@/config/redux/action/PostAction';
import { getAboutUser, getAllUsers } from '@/config/redux/action/authAction';
import UserLayout from '@/layouts/UserLayout';
import DashboardLayout from '@/layouts/DashboardLayout';
import styles from "./index.module.css";
import { BASE_URl, BaseURl } from '@/config';

export default function Dashboard() {
  
  const router=useRouter();

  const dispatch=useDispatch();

  const authState=useSelector((state)=>state.auth)


  

    

   
    useEffect(()=>{
      if(authState.isTokenThere){
        dispatch(getAllPosts())
        dispatch(getAboutUser({token:localStorage.getItem('token')}))

      }
      if(!authState.all_profiles_fetched){
          dispatch(getAllUsers());
        }
    },[authState.isTokenThere])

    const [postContent,setPostContent]=useState("")
    const [fileContent,setFileContent]=useState();

    const handelUpload=async()=>{
      await dispatch(createPost({file:fileContent,body:postContent}))
      setPostContent("")
      setFileContent(null)

    }




    if(authState.user){
    return (
    <UserLayout>
      
      <DashboardLayout>
        <div className={styles.scrollComponent}>
       
            <div className={styles.createPostContainer}>
              <img className={styles.userProfile}width={100} src={`${BASE_URl}/${authState.user.userID.profilePicture}`} alt="" />
              <textarea onChange={(e)=>setPostContent(e.target.value)} value={postContent} placeholder={"Whats in your mind"} className={styles.textarea} name="" id=""></textarea>
              <label htmlFor="fileUpload">
                <div className={styles.Fab}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>

                </div>
              </label>

              <input onChange={(e)=>setFileContent(e.target.files[0])}type="file" hidden id='fileUpload'/>
              {postContent.length >0 &&
              <div onClick={handelUpload} className={styles.uploadButton}>Post</div>
              }
              
            </div>
        </div>
      </DashboardLayout>
      
    </UserLayout>
  )
}else{
 return (
    <UserLayout>
      <DashboardLayout>
        <h2>Loading...</h2>
      </DashboardLayout>
    </UserLayout>
  )

}
}
