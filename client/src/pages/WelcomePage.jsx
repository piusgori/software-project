import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import TopBar from '../components/interface/TopBar';
import LogoImage from '../assets/icon.svg';

const MainBox = styled(Box)(() => ({
    height: '100%',
    width: '100%'
}));

const InsideBox = styled(Box)(() => ({
    padding: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30
}));

const Heading = styled(Typography)(() => ({
    fontWeight: '500',
}));

const Image = styled('img')(() => ({
    height: '250px',
    width: '250px'
}))

const WelcomePage = () => {
  return (
    <MainBox>
        <TopBar />
        <InsideBox>
            <Heading variant='h2' color='primary'>Welcome</Heading>
            <Typography sx={{ color: '#515151' }}  variant='h6' textAlign='center'>Welcome to our developer community, a platform designed to help you connect with other developers from around the world. Our community is dedicated to providing a space where you can ask and answer technical questions, share knowledge, and collaborate with other developers.</Typography>
            <Image src={LogoImage} alt='logo-image'></Image>
        </InsideBox>
    </MainBox>
  )
}

export default WelcomePage;