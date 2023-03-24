import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminBar from '../../components/admin/AdminBar'

const AdminPage = () => {
  return (
    <div>
        <AdminBar />
        <Outlet />
    </div>
  )
}

export default AdminPage