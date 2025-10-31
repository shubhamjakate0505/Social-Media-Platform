import { useRouter } from 'next/router'
import React, { use, useEffect } from 'react'

export default function Dashboard() {
  
    const router=useRouter();
    useEffect(()=>{
        if(localStorage.getItem("token")==null){
          router.push('/login');
        }
    })
    
    return (
    <div>
      dashboard
    </div>
  )
}
