import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

const NavBox = styled(Box)(() => ({
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40
}));

const RightContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10
}))

const AuthButton = styled(Button)(() => ({
    color: 'white'
}));

const NavBar = () => {
  return (
    <NavBox>
        <Typography variant='body1' sx={{ color: 'white' }}>LOGO</Typography>
        <RightContainer>
            <AuthButton>Login</AuthButton>
            <AuthButton variant='outlined' sx={{ borderColor: 'white' }} disableElevation>SignUp</AuthButton>
        </RightContainer>
    </NavBox>
  )
}

export default NavBar