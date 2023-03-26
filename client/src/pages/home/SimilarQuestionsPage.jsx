import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import TopBar from '../../components/interface/TopBar';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../services/app-context';
import Spinner from '../../components/interface/Spinner';
import Question from '../../components/home/Question';

const MainBox = styled(Box)(() => ({
    height: '100%',
    width: '100%'
  }));

const TopContainer = styled(Box)(() => ({
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20
}));

const MiddleContainer = styled(Box)(() => ({
    padding: 20,
}))

const SimilarQuestionsPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { getSimilarQuestions } = useContext(AppContext);

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const initialization = async () => {
        try {
          setIsLoading(true);
          setError(false);
          setErrorMessage('');
          const topQuestions = await getSimilarQuestions(id);
          setQuestions(topQuestions);
        } catch (err) {
          const errMessage = err?.response?.data?.content || err?.response?.data?.message || err?.response?.message || err?.message;
          setError(true);
          setErrorMessage(errMessage);
        } finally {
          setIsLoading(false);
        }
      };
    
      useEffect(() => {
        initialization();
        //eslint-disable-next-line
      }, [])

  return (
    <MainBox>
        <TopBar />
        <TopContainer>
            <Typography variant='h6' sx={{ color: '#515151' }}>Similar Questions</Typography>
            <Button onClick={() => { navigate('/ask-question') }} variant='contained'>Ask Question</Button>
        </TopContainer>
        <MiddleContainer>
            {isLoading && <Spinner />}
            {!isLoading && questions.length === 0 && <Typography sx={{ color: '#515151' }} textAlign='center' variant='h6'>No Questions for this field. Be the first to add.</Typography>}
            {!isLoading && questions.length > 0 && questions.map((each, index) => <Question key={index} ques={each} />)}
        </MiddleContainer>
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} autoHideDuration={10000} onClose={() => { setError(false) }}>
            <Alert onClose={() => { setError(false) }} severity='error' sx={{ width: '100%' }}>{errorMessage}</Alert>
        </Snackbar>
    </MainBox>
  )
}

export default SimilarQuestionsPage