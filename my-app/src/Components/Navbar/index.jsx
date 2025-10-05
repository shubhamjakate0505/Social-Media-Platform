import React from 'react';
import styles from './styles.module.css';
import { useRouter } from 'next/router';

function NavBarComponents() {
    const router=useRouter();
  return (
   <div className={styles.container}>
    <nav className={styles.navBar}>
        <h1 style={{cursor:"pointer"}} onClick={()=>{
            router.push('/')
        }}>Pro Connect</h1>

         <div className={styles.NavBarOptioncontainer}>
            <div onClick={()=>{
                router.push('/login')
            }} className={styles.buttonjoin}>
                <p>Be a part</p>
            </div>
         </div>


    </nav>
   </div>
  )
}

export default NavBarComponents
