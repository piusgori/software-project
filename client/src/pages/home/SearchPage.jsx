import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Box, Button, Snackbar, TextField, Typography } from '@mui/material';
import TopBar from '../../components/interface/TopBar';
import Spinner from '../../components/interface/Spinner';
import Question from '../../components/home/Question';
import { AppContext } from '../../services/app-context';
import AppDrawer from '../../components/interface/AppDrawer';

const MainBox = styled(Box)(() => ({
    height: '100%',
    width: '100%'
}));

const TopContainer = styled(Box)(() => ({
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    gap: 12
}));

const FormInput = styled(TextField)(() => ({
    width: '60%'
}));

const MiddleContainer = styled(Box)(() => ({
    padding: 20,
}));

const SearchPage = () => {

    const { search } = useContext(AppContext);

    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const searchHandler = async () => {
        try {
            setIsLoading(true);
            setError(false);
            setErrorMessage('');
            const searchResults = await search(input);
            setResults(searchResults);
        } catch (err) {
            const errMessage = err?.response?.data?.content || err?.response?.data?.message || err?.response?.message || err?.message;
            setError(true);
            setErrorMessage(errMessage);
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <MainBox>
        <TopBar />
        <AppDrawer/>
        <TopContainer>
            <FormInput placeholder='Search...' value={input} onChange={(e) => { setInput(e.target.value) }}></FormInput>
            <Button onClick={searchHandler} variant='contained' disableElevation>Search</Button>
        </TopContainer>
        <MiddleContainer>
            {isLoading && <Spinner />}
            {!isLoading && results.length === 0 && <Typography variant='body1' sx={{ color: '#515151', textAlign: 'center' }}>Enter Text To Search</Typography>}
            {!isLoading && results.length > 0 && results.map((e, i) => <Question key={i} ques={e} />)}
        </MiddleContainer>
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} autoHideDuration={10000} onClose={() => { setError(false) }}>
            <Alert onClose={() => { setError(false) }} severity='error' sx={{ width: '100%' }}>{errorMessage}</Alert>
        </Snackbar>
    </MainBox>
  )
}

export default SearchPage