import React from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from '../../components/interface/TopBar'

const AdminPage = () => {
  return (
    <div>
        <TopBar />
        <Outlet />
    </div>
  )
}

export default AdminPage