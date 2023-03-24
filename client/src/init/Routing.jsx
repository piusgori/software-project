import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminPage from '../pages/admin/AdminPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import HomePage from '../pages/home/HomePage';
import NotFound from '../pages/NotFound';

const Routing = () => {

    const ProtectedRoute = ({ children }) => {
        const isLoggedIn = false;
        if(!isLoggedIn) return <Navigate to='/login' />
    }

    const ProtectedAdminRoute = ({ children }) => {
        const isAdmin = false;
        if(!isAdmin) return <Navigate to='/admin/login' />
    }

  return (
    <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/admin' element={<AdminPage />}>
            <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
            <Route path='/admin/login' element={<AdminLoginPage />} />
        </Route>
    </Routes>
  )
}

export default Routing;