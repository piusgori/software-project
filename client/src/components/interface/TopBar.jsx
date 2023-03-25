import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/auth-context';
import { styled } from '@mui/material/styles';
import { Person } from '@mui/icons-material';

const ProfileButton = styled(Button)(() => ({
  color: 'white'
}))

const TopBar = () => {
  const navigate = useNavigate();
  const { profile } = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position='static'>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography>Dev Hub</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {!profile && <Button onClick={() => { navigate('/login') }} variant='text' sx={{ color: 'white' }}>Login</Button>}
            {!profile && <Button onClick={() => { navigate('/signup') }} variant='text' sx={{ color: 'white' }}>Signup</Button>}
            {profile && <ProfileButton startIcon={<Person />} variant='text'>{profile?.firstName}</ProfileButton>}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar