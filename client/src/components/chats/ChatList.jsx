import React, { useContext, useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { AuthContext } from '../../services/auth-context';
import { doc, onSnapshot } from 'firebase/firestore';
import { database } from '../../utils/firebase';
import { AppContext } from '../../services/app-context';
import { useNavigate } from 'react-router-dom';

const LeftContainer = styled(Box)(() => ({
    height: '100%',
    flex: 1,
    backgroundColor: '#dbcfe2',
    overflow: 'auto'
}));

const ChatList = () => {

    const { firebaseUser } = useContext(AuthContext);
    const { firebaseUsers, dispatch } = useContext(AppContext);
    const navigate = useNavigate();
    const theme = useTheme();
    const isScreenSmall = useMediaQuery(theme.breakpoints.down('md'));
    
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(database, 'userChats', firebaseUser.uid), (doc) => { setChats(doc.data()) });
        return () => { unsubscribe() };
    }, [firebaseUser]);

    const chatWithUser = (selected) => {
        const foundUser = firebaseUsers.find(e => e.email === selected?.userInfo?.email);
        if(!foundUser) return;
        dispatch({ type: 'CHANGE_USER', payload: foundUser });
        if (isScreenSmall) navigate('/message');
    }

  return (
    <LeftContainer>
        <Typography variant='h6' sx={{ color: '#515151', mx: 2, my: 4 }}>Chats</Typography>
        <List sx={{ width: '100%', maxWidth: 360 }}>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => {

                const userDate = chat[1]?.date?.toDate();
                const hour = new Date(userDate).getHours();
                const minute = new Date(userDate).getMinutes();

                return (
                <ListItem onClick={() => chatWithUser(chat[1])} key={chat[0]} sx={{ cursor: 'pointer' }} secondaryAction={<Typography sx={{ color: '#515151' }}>{`${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`}</Typography>}  alignItems='flex-start'>
                    <ListItemAvatar><Avatar alt={chat[1].userInfo.displayName} src={chat[1]?.userInfo?.photoURL} /></ListItemAvatar>
                    <ListItemText primary={chat[1].userInfo.displayName} secondary={chat[1].latestMessage?.text || ""}></ListItemText>
                </ListItem>
            )})}
        </List>
    </LeftContainer>
  )
}

export default ChatList