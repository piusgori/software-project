import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, Typography } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { GitHub } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GITHUB_CLIENT_ID } from '../../utils/firebase';
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

const LoginPage = () => {

  const navigate = useNavigate();
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

  const handleGitHubSignIn = () => {
    const clientId = GITHUB_CLIENT_ID;
    const redirectUri = `${CLIENT_URL}/login`;
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  const handleGitHubSignInCallback = async () => {
    try {
      const code = new URLSearchParams(window.location.search).get('code');
      if (!code) return;
      if (code) {
        setIsLoading(true);
        const { data } = await axios.get(`${SERVER_URL}/auth/access-token/${code}`);
        const splitData = data.split('=');
        if(splitData[0] === 'access_token') {
          const at = splitData[1].split('&scope')[0];
          if(at) {
            const config = { headers: { 'Authorization': `Bearer ${at}` } }
            const res = await axios.get(`https://api.github.com/user`, config);
            const { id, name, email, login } = res.data;
            const splitNames = name.split(' ');
            const githubForm = { email: email || `${login}@gmail.com`, firstName: splitNames[0], lastName: splitNames[1], githubId: id };
            await signupHandler(githubForm);
          } else {
            setIsLoading(false);
          }
        } else setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

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