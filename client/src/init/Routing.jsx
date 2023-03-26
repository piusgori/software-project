import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminPage from '../pages/admin/AdminPage';
import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import AskQuestionPage from '../pages/home/AskQuestionPage';
import HomePage from '../pages/home/HomePage';
import ProfilePage from '../pages/home/ProfilePage';
import SearchPage from '../pages/home/SearchPage';
import SimilarQuestionsPage from '../pages/home/SimilarQuestionsPage';
import SingleQuestionPage from '../pages/home/SingleQuestionPage';
import NotFound from '../pages/NotFound';
import WelcomePage from '../pages/WelcomePage';
import { AuthContext } from '../services/auth-context';

const Routing = () => {

    const { profile } = useContext(AuthContext);

    const ProtectedRoute = ({ children }) => {
        if(!profile) return <Navigate to='/login' />;
        return children
    }

    const ProtectedAdminRoute = ({ children }) => {
        const isAdmin = false;
        if(!isAdmin) return <Navigate to='/admin/login' />;
        return children;
    }

  return (
    <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/home' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/ask-question' element={<ProtectedRoute><AskQuestionPage /></ProtectedRoute>} />
        <Route path='/question/:id' element={<ProtectedRoute><SingleQuestionPage /></ProtectedRoute>} />
        <Route path='/similar-questions/:id' element={<ProtectedRoute><SimilarQuestionsPage /></ProtectedRoute>} />
        <Route path='/user/:id' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/search' element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
        <Route path='/admin' element={<AdminPage />}>
            <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
            <Route path='/admin/login' element={<AdminLoginPage />} />
        </Route>
        <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default Routing;