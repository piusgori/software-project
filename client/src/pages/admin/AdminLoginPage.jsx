import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Box, Button, Card, CircularProgress, Snackbar, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../../services/admin-context';

const MainBox = styled(Box)(() => ({
  height: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ece8ef'
}));

const AuthCard = styled(Card)(() => ({
  padding: 30,
  width: '60%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 26
}));

const FormButton = styled(Button)(() => ({
  width: '100%',
  borderRadius: 30
}))

const AdminLoginPage = () => {

  const navigate = useNavigate();
  const { adminLogin } = useContext(AdminContext);
  const loginForm = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Your Email Address' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Your Password' },
  ]

  const [data, Inputs] = useForm(loginForm);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loginHandler = async (form) => {
    try {
      setIsLoading(true);
      setSuccess(false);
      setError(false);
      setErrorMessage('');
      await adminLogin(form);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/admin/dashboard');
      }, 3000);
    } catch (err) {
      const errMessage = err?.response?.data?.content || err?.response?.data?.message || err?.response?.message || err?.message;
      setSuccess(false);
      setError(true);
      setErrorMessage(errMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const isBDis = (!data.email.includes('@') || data.password.length < 1);
    setButtonDisabled(isBDis);
  }, [data]);

  return (
    <MainBox>
      <AuthCard>
        <Typography color='primary' variant='h3'>Dev Hub Admin</Typography>
        <Typography sx={{ color: '#515151', mb: 5 }} variant='h6'>Admin Login</Typography>
        {Inputs}
        {isLoading && <CircularProgress />}
        {!isLoading && <>
          <FormButton disabled={buttonDisabled} onClick={() => loginHandler(data)} variant='contained' disableElevation>Login</FormButton>
        </>}
      </AuthCard>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={success} autoHideDuration={6000} onClose={() => { setSuccess(false) }}>
          <Alert onClose={() => { setSuccess(false) }} severity='success' sx={{ width: '100%' }}>Admin login successful</Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} autoHideDuration={10000} onClose={() => { setError(false) }}>
          <Alert onClose={() => { setError(false) }} severity='error' sx={{ width: '100%' }}>{errorMessage}</Alert>
      </Snackbar>
    </MainBox>
  )
}

export default AdminLoginPage