import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position='static'>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography>Dev Hub</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Button onClick={() => { navigate('/login') }} variant='text' sx={{ color: 'white' }}>Login</Button>
            <Button onClick={() => { navigate('/signup') }} variant='text' sx={{ color: 'white' }}>Signup</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar