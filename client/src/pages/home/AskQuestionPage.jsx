import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Box, Button, Card, CircularProgress, Snackbar, Typography } from '@mui/material';
import TopBar from '../../components/interface/TopBar';
import { AppContext } from '../../services/app-context';
import { useForm } from '../../hooks/useForm';
import { useNavigate } from 'react-router-dom';

const MainBox = styled(Box)(() => ({
    height: '100%',
    width: '100%'
}));

const OverallContainer = styled(Box)(() => ({
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ece8ef',
    minHeight: '100vh'
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

const AskQuestionPage = () => {

    const { fields, askQuestion } = useContext(AppContext);
    const navigate = useNavigate();

    const pageForm = [
        { name: 'title', label: 'Title', type: 'text', placeholder: 'Title' },
        { name: 'question', label: 'Question', type: 'text', placeholder: 'Question' },
        { name: 'field', label: 'Select Field', type: 'select', options: fields, placeholder: 'Select Field' }
    ];

    const [data, Inputs] = useForm(pageForm);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const addQuestionHandler = async () => {
        try {
            setIsLoading(true);
            setSuccess(false);
            setError(false);
            setErrorMessage('');
            await askQuestion(data);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                navigate('/home');
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
        const isBs = (data.title.length < 3 || data.question.length < 3 || data.field.length < 1);
        setButtonDisabled(isBs);
    }, [data]);

  return (
    <MainBox>
        <TopBar />
        <OverallContainer>
            <AuthCard>
                <Typography sx={{ color: '#515151', mb: 5 }} variant='h6'>Login To Your Account</Typography>
                {Inputs}
                {!isLoading && <FormButton onClick={addQuestionHandler} variant='contained' disableElevation disabled={buttonDisabled}>Add Question</FormButton>}
                {isLoading && <CircularProgress />}
            </AuthCard>
        </OverallContainer>
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={success} autoHideDuration={6000} onClose={() => { setSuccess(false) }}>
            <Alert onClose={() => { setSuccess(false) }} severity='success' sx={{ width: '100%' }}>Question has been added</Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} autoHideDuration={10000} onClose={() => { setError(false) }}>
            <Alert onClose={() => { setError(false) }} severity='error' sx={{ width: '100%' }}>{errorMessage}</Alert>
        </Snackbar>
    </MainBox>
  )
}

export default AskQuestionPage