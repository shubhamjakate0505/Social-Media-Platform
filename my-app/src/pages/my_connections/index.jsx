import DashboardLayout from '@/layouts/DashboardLayout'
import UserLayout from '@/layouts/UserLayout'
import React from 'react'

export default function myconnectionsPage() {
  return (
    <UserLayout>
      
      <DashboardLayout>
        <div>
          <h1>My Connection</h1>
        </div>
      </DashboardLayout>
      
    </UserLayout>
  )
}
