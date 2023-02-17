import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import { styled } from '@mui/material/styles';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';

const ContentContainer = styled(Box)(({ theme }) => ({
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        
    }
}));

const BodCont = styled(Box)(({ theme }) => ({
    maxWidth: '40vw',
    [theme.breakpoints.down('md')]: {
        maxWidth: '80vw'
    }
}));

const MailContainer = styled(Box)(() => ({
    flex: 1,
    display: 'flex'
}));

const MailInput = styled(TextField)(() => ({
    flex: 5,
    backgroundColor: 'white'
}));

const MailButton = styled(Button)(() => ({
    flex: 2
}));

const Title = styled(Typography)(({ theme }) => ({
    color: 'white',
    marginBottom: 5,
    fontSize: '3.5rem',
    [theme.breakpoints.down('md')]: {
        fontSize: "2rem"
    }
}));

const Spinner = styled (CircularProgress)(() => ({
    marginLeft: 10,
    justifySelf: 'center',
    alignSelf: 'center'
}))

const WelcomePage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [success, setSucces] = useState(false);
    const [error, setError] = useState('');

    const emailSendingHandler = async () => {
        setIsLoading(true);
        setSucces(false);
        setError('');
        setTimeout(() => {
            setIsLoading(false);
            setSucces(true);
            setTimeout(() => {
                setSucces(false);
            }, 2000)
        }, 4000)
        // try {
        //     setIsLoading(true);
        //     setSucces(false);
        //     setError('');
        //     setTimeout(() => {
        //         setIsLoading(false);
        //         setSucces(true);
        //         setTimeout(() => {
        //             setSucces(false);
        //         }, 2000)
        //     }, 4000)
        // } catch (err) {
        //     setSucces(false);
        //     setError('Error');
        // } finally {
        //     setIsLoading(false);
        // }
    }

  return (
    <div className='container'>
        <NavBar></NavBar>
        <ContentContainer>
            <BodCont>
                <Title fontWeight="bold">Where Developers Find Solution</Title>
                <Typography sx={{ color: 'rgb(200, 200, 200)', marginBottom: 5 }} variant='h6'>Join Our Platform To Interact With Other Developers And Build Your Skills. Engage With Your Team To Assist In Solution Provision.</Typography>
                <MailContainer>
                    <MailInput color='secondary' variant='outlined'></MailInput>
                    {isLoading && <Spinner></Spinner>}
                    {!isLoading && !success && <MailButton onClick={emailSendingHandler} variant='contained' color='secondary' disableElevation>Send</MailButton>}
                    {!isLoading && !error && success &&<Typography sx={{ alignSelf: 'center', justifySelf: 'center', marginLeft: 5 }} color='green' variant='h6'>Sent</Typography>}
                    {!isLoading && !success && error &&<Typography sx={{ alignSelf: 'center', justifySelf: 'center', marginLeft: 5 }} color='red' variant='h6'>{error}</Typography>}
                </MailContainer>
            </BodCont>
        </ContentContainer>
    </div>
  )
}

export default WelcomePage;