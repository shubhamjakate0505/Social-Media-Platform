import { BASE_URl } from '@/config'
import { getAllUsers } from '@/config/redux/action/authAction'
import DashboardLayout from '@/layouts/DashboardLayout'
import UserLayout from '@/layouts/UserLayout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from "./index.module.css"
import { useRouter } from 'next/router'

export default function Discoverpage() {
  
  const authState=useSelector((state)=>state.auth)
    const dispatch=useDispatch();  
    
  useEffect(()=>{
        if(!authState.all_profiles_fetched){
          dispatch(getAllUsers());
        }
    },[])
    
    const  router=useRouter()
  
  return (
   <UserLayout>
      
      <DashboardLayout>
        <div>
          <h1>Discover</h1>
          <div className={styles.allUserProfile}>
            {authState.all_profiles_fetched && authState.all_users.map((user)=>{
              return (
              <div onClick={()=>{
                  router.push(`/view_Profiles/${user.userID.username}`)
              }}
               key={user.id} className={styles.userCard}>
                <img className={styles.userCard__Image} src={`${BASE_URl}/${user.userID.profilePicture}`} alt="Profile"/>
                <div> 
                  <h1>{user.userID.name}</h1>
                  <p>{user.userID.username}</p>   
                </div>
                

              </div>
              )
            })}
          </div>

        </div>
      </DashboardLayout>
      
    </UserLayout>
  )
}
