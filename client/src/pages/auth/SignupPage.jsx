import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { GitHub } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../../utils/firebase';
import axios from 'axios';
import { CLIENT_URL, SERVER_URL } from '../../utils/data';

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

const SignupPage = () => {

  const navigate = useNavigate();

  const loginForm = [
    { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'Your First Name' },
    { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Your Last Name' },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Your Email Address' },
    { name: 'password', label: 'Password', type: 'password', placeholder: 'Your Password' },
  ];
  const [data, Inputs] = useForm(loginForm);

  const handleGitHubSignIn = () => {
    const clientId = GITHUB_CLIENT_ID;
    const redirectUri = `${CLIENT_URL}/signup`;
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  const handleGitHubSignInCallback = async () => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) return;
    if (code) {
      const { data } = await axios.get(`${SERVER_URL}/auth/access-token/${code}`);
      console.log(data)
    }
    // const clientId = GITHUB_CLIENT_ID;
    // const clientSecret = GITHUB_CLIENT_SECRET;
    // const redirectUri = `${CLIENT_URL}/signup`;
    // const tokenUrl = 'https://github.com/login/oauth/access_token';
    // if (code) {
    //   try {
    //     const body = { client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUri, };
    //     const { data } = await axios.post(tokenUrl, body);
    //     console.log(data);
    //   } catch (error) {
    //     console.error('GitHub sign-in failed:', error);
    //   }
    // }
  };

  useEffect(() => {
    handleGitHubSignInCallback();
  }, [])
  

  return (
    <MainBox>
      <AuthCard>
        <Typography color='primary' variant='h3'>Dev Hub</Typography>
        <Typography sx={{ color: '#515151', mb: 5 }} variant='h6'>Create An Account</Typography>
        {Inputs}
        <>
          <FormButton variant='contained' disableElevation>Register</FormButton>
          <Typography sx={{ color: '#515151' }} variant='h6'>Or</Typography>
          <Button onClick={handleGitHubSignIn} startIcon={<GitHub />} variant='outlined'>Signup With GitHub</Button>
          <BelowContainer>
            <Typography sx={{ color: '#515151' }}>Already Have An Account?</Typography>
            <Button onClick={() => { navigate('/login') }} variant='text'>Log In</Button>
          </BelowContainer>
        </>
      </AuthCard>
    </MainBox>
  )
}

export default SignupPage