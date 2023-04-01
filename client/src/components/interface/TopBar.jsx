import { AppBar, Box, Button, IconButton, Toolbar, useMediaQuery } from '@mui/material'
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/auth-context';
import { styled, useTheme } from '@mui/material/styles';
import { Forum, Home, Menu, Person, Search } from '@mui/icons-material';
import { InterfaceContext } from '../../services/interface-context';
import { AdminContext } from '../../services/admin-context';

const ProfileButton = styled(Button)(() => ({
  color: 'white'
}))

const TopBar = () => {
  const navigate = useNavigate();
  const { profile } = useContext(AuthContext);
  const { admin } = useContext(AdminContext);
  const { openDrawer } = useContext(InterfaceContext);
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={0} position='static'>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {isScreenSmall && <IconButton onClick={openDrawer}><Menu sx={{ color: 'white' }} /></IconButton>}
          {!isScreenSmall && <ProfileButton onClick={(() => { navigate(admin ? '/admin/dashboard' : '/home') })} startIcon={<Home />} variant='text'>Dev Hub</ProfileButton>}
          {!isScreenSmall && <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {!profile && !admin && <Button onClick={() => { navigate('/login') }} variant='text' sx={{ color: 'white' }}>Login</Button>}
            {!profile && !admin && <Button onClick={() => { navigate('/signup') }} variant='text' sx={{ color: 'white' }}>Signup</Button>}
            {admin && <Button onClick={() => { navigate('/admin/users') }} variant='text' sx={{ color: 'white' }}>Users</Button>}
            {admin && <Button onClick={() => { navigate('/admin/add-field') }} variant='text' sx={{ color: 'white' }}>Add Field</Button>}
            {profile && <ProfileButton onClick={(() => { navigate('/search') })} startIcon={<Search />} variant='text'>Search</ProfileButton>}
            {profile && <ProfileButton onClick={(() => { navigate('/chats') })} startIcon={<Forum />} variant='text'>Chats</ProfileButton>}
            {profile && <ProfileButton onClick={() => { navigate(`/user/${profile._id}`) }} startIcon={<Person />} variant='text'>{profile?.firstName}</ProfileButton>}
          </Box>}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default TopBar