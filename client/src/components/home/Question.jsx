import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Schedule, Visibility } from '@mui/icons-material';
import * as NumberFormat from 'easy-number-formatter';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const Overall = styled(Paper)(() => ({
    padding: 12,
    border: '1px solid #666362',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 20,
    marginBottom: 20,
    cursor: 'pointer',
}));

const Title = styled(Typography)(() => ({
    fontWeight: '600',
    textTransform: 'capitalize'
}));

const QuestionText = styled(Typography)(() => ({
    fontWeight: '400',
    color: '#515151'
}));

const Bottom = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}));

const Details = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: 4
}));

const Text = styled(Typography)(() => ({
    color: '#515151'
}));

const Question = ({ ques }) => {

    const { title, question, createdAt, views, _id } = ques;
    const formattedNumber = NumberFormat.formatNumber(views);
    const timeago = moment(createdAt).fromNow();

    const navigate = useNavigate();

  return (
    <Overall onClick={() => { navigate(`/question/${_id}`) }} elevation={0}>
        <Title variant='h5'>{title}</Title>
        <QuestionText variant='subtitle1'>{question}</QuestionText>
        <Bottom>
            <Details>
                <Schedule color='primary' />
                <Text>{timeago}</Text>
            </Details>
            <Details>
                <Visibility color='primary' />
                <Text variant='body1'>{formattedNumber} Views</Text>
            </Details>
        </Bottom>
    </Overall>
  )
}

export default Question;