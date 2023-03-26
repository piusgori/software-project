import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, IconButton, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { AuthContext } from '../../services/auth-context';
import { AppContext } from '../../services/app-context';
import moment from 'moment';

const TopContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 30,
    marginTop: 10,
}));

const VotesContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
}));

const Text = styled(Typography)(() => ({
    color: '#515151'
}));

const AnswerContainer = styled(Box)(() => ({
    flex: 1
}));

const Title = styled(Typography)(() => ({
    fontWeight: '600',
    textTransform: 'capitalize'
}));

const Answer = ({ ans, answerVote, answerUnvote }) => {

    const { profile } = useContext(AuthContext);
    const { voteAnswer, unvoteAnswer } = useContext(AppContext);

    const [voteDisabled, setVoteDisabled] = useState(false);
    const [unvoteDisabled, setUnvoteDisabled] = useState(false);

    const voteAnswerHandler = async () => {
        await voteAnswer(ans._id);
        answerVote(ans._id);
    };

    const unvoteAnswerHandler = async() => {
        await unvoteAnswer(ans._id);
        answerUnvote(ans._id);
    };

    useEffect(() => {
        const foundAnswer = profile?.votedAnswers.find(e => e === ans._id);
        if(foundAnswer) {
            setVoteDisabled(true);
            setUnvoteDisabled(false);
        } else {
            setVoteDisabled(false);
            setUnvoteDisabled(true)
        }
    }, [profile?.votedAnswers])

  return (
    <TopContainer>
        <VotesContainer>
            <IconButton disabled={voteDisabled} onClick={voteAnswerHandler}><KeyboardArrowUp color='primary' /></IconButton>
            <Text variant='body1'>{ans.votes}</Text>
            <IconButton disabled={unvoteDisabled} onClick={unvoteAnswerHandler}><KeyboardArrowDown color='primary' /></IconButton>
        </VotesContainer>
        <AnswerContainer>
            <Title variant='h5'>{ans.userName}</Title>
            <Text variant='body1'>{ans.answer}</Text>
        </AnswerContainer>
        <Text variant='body1'>{moment(ans.createdAt).fromNow()}</Text>
    </TopContainer>
  )
}

export default Answer;