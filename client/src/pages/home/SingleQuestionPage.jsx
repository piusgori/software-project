import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Box, Button, IconButton, Paper, Snackbar, TextField, Typography } from '@mui/material';
import TopBar from '../../components/interface/TopBar';
import { AddCard, ArrowBack, Comment, Person, Send } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import Answer from '../../components/home/Answer';
import { AppContext } from '../../services/app-context';
import * as NumberFormat from 'easy-number-formatter';
import moment from 'moment';
import Spinner from '../../components/interface/Spinner';

const MainBox = styled(Box)(() => ({
    height: '100%',
    width: '100%',
}));

const TopContainer = styled(Box)(() => ({
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 20,
    paddingRight: 20,
}));

const Overall = styled(Paper)(() => ({
    padding: 12,
    border: '1px solid #666362',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 20,
    marginBottom: 20,
}));

const MiddleContainer = styled(Box)(() => ({
    padding: 20,
}));

const Bottom = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}));

const Details = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: 5
}));

const Text = styled(Typography)(() => ({
    color: '#515151'
}));

const DetText = styled(Typography)(() => ({
    color: '#4B0F70'
}));

const Title = styled(Typography)(() => ({
    fontWeight: '600',
    textTransform: 'capitalize'
}));

const QuestionText = styled(Typography)(() => ({
    fontWeight: '400',
    color: '#515151'
}));

const BelowContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}));

const ActionsContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: 6,
}));

const InputContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20
}))

const FormInput = styled(TextField)(() => ({
    flex: 1
}))

const SingleQuestionPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { questionAnswers, singleQuestion, answerQuestion } = useContext(AppContext);

    const [isLoading, setIsLoading] = useState(true);
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState({ title: '', question: '', views: '', createdAt: '', field: '', user: '' });
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const answerQuestionHandler = async () => {
        try {
            const form = { question: id, answer };
            const addedAnswer = await answerQuestion(form);
            setAnswers(prev => [...prev, addedAnswer]);
            setAnswer('');
        } catch (err) {
            const errMessage = err?.response?.data?.content || err?.response?.data?.message || err?.response?.message || err?.message;
            setError(true);
            setErrorMessage(errMessage);
        }
    };

    const answerVote = (id) => {
        setAnswers(prev => {
            const newArray = prev;
            const foundAnswerIndex = newArray.findIndex(e => e._id === id);
            if(foundAnswerIndex >= 0) {
                const incremented = Number(newArray[foundAnswerIndex].votes) + 1;
                newArray[foundAnswerIndex].votes = incremented
            }
            return newArray;
        });
    };

    const answerUnvote = (id) => {
        setAnswers(prev => {
            const newArray = prev;
            const foundAnswerIndex = newArray.findIndex(e => e._id === id);
            if(foundAnswerIndex >= 0) {
                const decremented = Number(newArray[foundAnswerIndex].votes) - 1;
                newArray[foundAnswerIndex].votes = incremented
            }
            return newArray;
        });
    };

    const initialization = async () => {
        try {
            setIsLoading(true);
            const foundQuestion = await singleQuestion(id);
            const foundAnswers = await questionAnswers(id);
            setQuestion(foundQuestion);
            setAnswers(foundAnswers);
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
            <IconButton onClick={() => { navigate(-1) }}><ArrowBack color='primary' /></IconButton>
            <Typography variant='h6' sx={{ color: '#515151' }}>Question</Typography>
        </TopContainer>
        {isLoading && <Spinner />}
        {!isLoading && <MiddleContainer>
            <Overall>
                <Title variant='h5'>{question.title}</Title>
                <Bottom>
                    <Details>
                        <Text variant='body1'>Number Of Views:</Text>
                        <DetText variant='body1'>{question.views ? NumberFormat.formatNumber(question.views) : ''}</DetText>
                    </Details>
                    <Details>
                        <Text variant='body1'>Time Posted:</Text>
                        <DetText variant='body1'>{question.createdAt ? moment(question.createdAt).fromNow() : ''}</DetText>
                    </Details>
                </Bottom>
                <QuestionText variant='subtitle1'>{question.question}</QuestionText>
                <BelowContainer>
                    <Box></Box>
                    <ActionsContainer>
                        <Details>
                            <Comment color='primary' />
                            <Text>{answers.length} Answers</Text>
                        </Details>
                        <Button onClick={() => { navigate(`/user/${question.user}`) }} startIcon={<Person />} variant='text'>Profile</Button>
                        <Button onClick={() => { navigate(`/similar-questions/${question.field}`) }} startIcon={<AddCard />} variant='text'>Similar Questions</Button>
                    </ActionsContainer>
                </BelowContainer>
            </Overall>
            <InputContainer>
                <FormInput name='answer' type='text' value={answer} placeholder='Answer...' onChange={(e) => { setAnswer(e.target.value) }}></FormInput>
                <IconButton onClick={answerQuestionHandler} size='large' disabled={answer.length === 0}><Send size={30} color='primary' /></IconButton>
            </InputContainer>
            <Typography variant='h6' sx={{ color: '#515151', mb: 3 }}>Answers</Typography>
            {answers.length === 0 && <Typography variant='body1' sx={{ color: '#515151', textAlign: 'center' }}>No Answers Provided. Be The First To Answer</Typography>}
            {answers.length > 0 && answers.map((e, i) => <Answer answerVote={answerVote} answerUnvote={answerUnvote} key={i} ans={e} />)};
        </MiddleContainer>}
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} autoHideDuration={10000} onClose={() => { setError(false) }}>
            <Alert onClose={() => { setError(false) }} severity='error' sx={{ width: '100%' }}>{errorMessage}</Alert>
        </Snackbar>
    </MainBox>
  )
}

export default SingleQuestionPage;