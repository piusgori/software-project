import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Alert, Box, Button, IconButton, Snackbar, Typography } from '@mui/material';
import TopBar from '../../components/interface/TopBar';
import { ArrowBack, MarkChatUnread } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../services/auth-context';
import { AppContext } from '../../services/app-context';
import Spinner from '../../components/interface/Spinner';
import * as NumberFormat from 'easy-number-formatter';
import Question from '../../components/home/Question';
import AppDrawer from '../../components/interface/AppDrawer';

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
  }));

const ProfileContainer = styled(Box)(() => ({
    padding: 20,
    backgroundColor: '#F9F9F9',
    display: 'flex',
    alignItems: 'center',
    gap: 20
}));

const ImageReplacement = styled(Box)(({ theme }) => ({
    height: '150px',
    width: '150px',
    borderRadius: '50%',
    backgroundColor: '#4B0F70',
    [theme.breakpoints.down('md')]: {
        height: '75px',
        width: '75px',
    }
}));

const ProfileDetails = styled(Box)(() => ({
    flex: 1
}));

const ProfileTop = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}))

const Title = styled(Typography)(() => ({
    fontWeight: '600',
    textTransform: 'capitalize'
}));

const FollowContainer = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: 20
}));

const FollowDetails = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: 4
}))

const ProfilePage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { profile } = useContext(AuthContext);
    const { userQuestions, followUser, unfollowUser, getUserDetails } = useContext(AppContext);

    const [user, setUser] = useState({ firstName: '', lastName: '', email: '', followers: [], following: [], _id: '' });
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const initialization = async () => {
        try {
            setIsLoading(true);
            setError(false);
            setErrorMessage('');
            const userDetails = await getUserDetails(id);
            const uQues = await userQuestions(id);
            setUser(userDetails);
            setQuestions(uQues);
        } catch (err) {
            const errMessage = err?.response?.data?.content || err?.response?.data?.message || err?.response?.message || err?.message;
            setError(true);
            setErrorMessage(errMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const followSubmit = async () => {
        try {
            const foundUser = profile.following.find(e => e === id);
            foundUser ? await unfollowUser(id) : await followUser(id);
            if (foundUser) {
                setUser(p => ({ ...p, followers: p.followers.filter(e => e !== profile._id) }))
            } else {
                setUser(p => ({ ...p, followers: [...p.followers, profile._id] }))
            }
        } catch (err) {
            const errMessage = err?.response?.data?.content || err?.response?.data?.message || err?.response?.message || err?.message;
            setError(true);
            setErrorMessage(errMessage);
        }
    };

    useEffect(() => {
        initialization();
        //eslint-disable-next-line
      }, [id]);

  return (
    <MainBox>
        <TopBar />
        <AppDrawer />
        <TopContainer>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton onClick={() => { navigate(-1) }}><ArrowBack color='primary' /></IconButton>
                <Typography variant='h6' sx={{ color: '#515151' }}>Profile</Typography>
            </Box>
            <Button onClick={() => { navigate('/ask-question') }} variant='contained'>Ask Question</Button>
        </TopContainer>
        {isLoading && <Spinner />}
        {!isLoading && <MiddleContainer>
            <ProfileContainer>
                <ImageReplacement />
                <ProfileDetails>
                    <ProfileTop>
                        <Title variant='h5'>{user.firstName} {user.lastName}</Title>
                        <Button disabled={profile._id === user._id} onClick={followSubmit} sx={{ borderRadius: 20 }} variant='contained' disableElevation>{profile.following.find(e => e === id) ? 'Unfollow' : 'Follow'}</Button>
                    </ProfileTop>
                    <Typography sx={{ color: '#515151', mb: 2 }}>{user.email}</Typography>
                    <FollowContainer>
                        <FollowDetails>
                            <Title>Followers</Title>
                            <Typography sx={{ color: '#515151' }}>{NumberFormat.formatNumber(user.followers.length)}</Typography>
                        </FollowDetails>
                        <FollowDetails>
                            <Title>Following</Title>
                            <Typography sx={{ color: '#515151' }}>{NumberFormat.formatNumber(user.following.length)}</Typography>
                        </FollowDetails>
                    </FollowContainer>
                    <Button disabled={profile._id === user._id} startIcon={<MarkChatUnread />} variant='text'>Chat</Button>
                </ProfileDetails>
            </ProfileContainer>
            <Typography variant='h6' sx={{ color: '#515151', mt: 2, mb: 2 }}>Past Questions</Typography>
            {questions.length === 0 && <Typography variant='body1' sx={{ color: '#515151', mt: 2, mb: 2 }}>User has not yet asked a question</Typography>}
            {questions.length > 0 && questions.map((e, i) => <Question ques={e} key={i}  />)}
        </MiddleContainer>}
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={error} autoHideDuration={10000} onClose={() => { setError(false) }}>
            <Alert onClose={() => { setError(false) }} severity='error' sx={{ width: '100%' }}>{errorMessage}</Alert>
        </Snackbar>
    </MainBox>
  )
}

export default ProfilePage