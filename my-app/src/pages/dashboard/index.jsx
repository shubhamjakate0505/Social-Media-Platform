import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts } from '@/config/redux/action/PostAction';
import { getAboutUser } from '@/config/redux/action/authAction';
import UserLayout from '@/layouts/UserLayout';
import DashboardLayout from '@/layouts/DashboardLayout';

export default function Dashboard() {
  
  const router=useRouter();

  const dispath=useDispatch();

  const authState=useSelector((state)=>state.auth)


  

    

   
    useEffect(()=>{
      if(authState.isTokenThere){
        dispath(getAllPosts())
        dispath(getAboutUser({token:localStorage.getItem('token')}))

      }
    },[authState.isTokenThere])
    
    return (
    <UserLayout>
      
      <DashboardLayout>
        <div>
          <h1>Dashboard</h1>
        </div>
      </DashboardLayout>
      
    </UserLayout>
  )
}
