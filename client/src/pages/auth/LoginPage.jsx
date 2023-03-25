import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { GitHub } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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

const BelowContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 5
}));

const FormButton = styled(Button)(() => ({
  width: '100%',
  borderRadius: 30
}))

const LoginPage = () => {

  const navigate = useNavigate();
  const loginForm = [
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Your Email Address' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Your Password' },
  ]

  const [data, Inputs] = useForm(loginForm);

  return (
    <MainBox>
      <AuthCard>
        <Typography color='primary' variant='h3'>Dev Hub</Typography>
        <Typography sx={{ color: '#515151', mb: 5 }} variant='h6'>Login To Your Account</Typography>
        {Inputs}
        <>
          <FormButton variant='contained' disableElevation>Login</FormButton>
          <Typography sx={{ color: '#515151' }} variant='h6'>Or</Typography>
          <Button startIcon={<GitHub />} variant='outlined'>Login With GitHub</Button>
          <BelowContainer>
            <Typography sx={{ color: '#515151' }}>Don't Have An Account</Typography>
            <Button onClick={() => { navigate('/signup') }} variant='text'> Sign Up</Button>
          </BelowContainer>
        </>
      </AuthCard>
    </MainBox>
  )
}

export default LoginPage