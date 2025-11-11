import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/PostAction';
import { getAboutUser } from '@/config/redux/action/authAction';

export default function Dashboard() {
  
  const[isTokenThere,setIsTokanThere]=useState(false);

    const router=useRouter();

    const dispath=useDispatch();


    useEffect(()=>{
        if(localStorage.getItem("token")==null){
          router.push('/login');
        }
        setIsTokanThere(true)
    })
    useEffect(()=>{
      if(isTokenThere){
        dispath(getAllPosts())
        dispath(getAboutUser({token:localStorage.getItem('token')}))

      }
    },[isTokenThere])
    
    return (
    <div>
      dashboard
    </div>
  )
}
