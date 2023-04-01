import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Box, Button, Card, CircularProgress, Snackbar, Typography } from '@mui/material';
import TopBar from '../../components/interface/TopBar';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import AppDrawer from '../../components/interface/AppDrawer';
import { AdminContext } from '../../services/admin-context';

const MainBox = styled(Box)(() => ({
  height: '100vh',
  width: '100%'
}));

const OverallContainer = styled(Box)(() => ({
  padding: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#ece8ef',
  height: '100%'
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

const AddFieldPage = () => {
  const { addField } = useContext(AdminContext);
  const navigate = useNavigate();

    const pageForm = [
        { name: 'name', label: 'Name', type: 'text', placeholder: 'Name' },
    ];

    const [data, Inputs] = useForm(pageForm);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const addFieldHandler = async () => {
        try {
            setIsLoading(true);
            setSuccess(false);
            setError(false);
            setErrorMessage('');
            await addField(data);
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
    }

    useEffect(() => {
        const isBs = (data.name.length < 3);
        setButtonDisabled(isBs);
    }, [data]);

  return (
    <MainBox>
        <TopBar />
        <AppDrawer />
        <OverallContainer>
            <AuthCard>
                <Typography sx={{ color: '#515151', mb: 5 }} variant='h6'>Ask Field</Typography>
                {Inputs}
                {!isLoading && <FormButton onClick={addFieldHandler} variant='contained' disableElevation disabled={buttonDisabled}>Add Field</FormButton>}
                {isLoading && <CircularProgress />}
            </AuthCard>
        </OverallContainer>
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={success} autoHideDuration={6000} onClose={() => { setSuccess(false) }}>
            <Alert onClose={() => { setSuccess(false) }} severity='success' sx={{ width: '100%' }}>Field has been added</Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} autoHideDuration={10000} onClose={() => { setError(false) }}>
            <Alert onClose={() => { setError(false) }} severity='error' sx={{ width: '100%' }}>{errorMessage}</Alert>
        </Snackbar>
    </MainBox>
  )
}

export default AddFieldPage