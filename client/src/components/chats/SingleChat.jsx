import React, { useCallback, useContext, useEffect, useState } from 'react';
import { styled , useTheme} from '@mui/material/styles';
import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { ChatContainer, MainContainer, Message, MessageInput, MessageList } from '@chatscope/chat-ui-kit-react';
import { AppContext } from '../../services/app-context';
import { auth, database } from '../../utils/firebase';
import { AuthContext } from '../../services/auth-context';
import { arrayUnion, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const RightContainer = styled(Box)(({ theme }) => ({
    height: '100%',
    flex: 4,
    [theme.breakpoints.down('md')]: {
        height: '90vh'
    }
}));

const Header = styled(Box)(() => ({
    width: '100%',
    padding: 12,
    backgroundColor: '#4B0F70',
    display: 'flex',
    alignItems: 'center',
    gap: 5
}))

const SingleChat = () => {

    const { chatState } = useContext(AppContext);
    const { firebaseUser } = useContext(AuthContext);
    const theme = useTheme();
    const isScreenSmall = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);

    const onSend = useCallback(async (e) => {
        const _id = Math.random();
        const createdAt = new Date()
        const text = e;
        const user = { _id: auth?.currentUser?.email, avatar: auth?.currentUser?.photoURL };
        const sendMessage = { _id, createdAt, text, user };
        setMessages(prev => [sendMessage, ...prev]);
        await updateDoc(doc(database, 'chats', chatState?.chatId), { messages: arrayUnion(sendMessage) });
        await updateDoc(doc(database, 'userChats', firebaseUser?.uid), { [chatState.chatId + ".latestMessage"]: { text }, [chatState.chatId + ".date"]: serverTimestamp() });
        await updateDoc(doc(database, 'userChats', chatState?.user?.uid), { [chatState.chatId + ".latestMessage"]: { text }, [chatState.chatId + ".date"]: serverTimestamp() });
    }, []);

    useEffect(() => {
        const unsubscribe = (!chatState || !chatState.chatId || !chatState.user) ? () => { console.log('select a chat') } : onSnapshot(doc(database, 'chats', chatState?.chatId), (doc) => {
            if(doc.exists()) {
                const receivedMessages = doc.data().messages.sort((a, b) => new Date(b.createdAt).getTime() -  new Date(a.createdAt).getTime());
                const updatedMessages = receivedMessages.map(mes => ({ ...mes, createdAt: mes.createdAt }))
                setMessages(updatedMessages);
            } else {
                console.log('does not exist');
            }
        })
        return () => unsubscribe();
        }, [])

    if(!chatState || !chatState.chatId || !chatState.user) return (
        <RightContainer>
            <Box sx={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography>Select a chat to start chatting</Typography>
            </Box>
        </RightContainer>
    )

  return (
    <RightContainer>
        {isScreenSmall && <Header>
            <IconButton onClick={() => { navigate(-1) }}><ArrowBack sx={{ color: 'white' }} /></IconButton>
            <Typography sx={{ color: 'white' }}>{chatState?.user?.displayName}</Typography>
        </Header>}
        <MainContainer>
            <ChatContainer>
                <MessageList>
                    {messages.map(e => {
                        const theDate = new Date(e.createdAt);
                        return <Message key={e._id} model={{ message: e?.text,  sentTime: moment(theDate).fromNow(), sender: e?.user?._id === firebaseUser?.email ? firebaseUser?.displayName : chatState?.userInfo?.displayName, direction: e?.user?._id === firebaseUser?.email ? 'outgoing' : 'incoming' }}>
                            <Message.Footer sentTime={moment(theDate).fromNow()} />
                        </Message>
                    })}
                </MessageList>
                <MessageInput onSend={onSend} placeholder='Type Message...'></MessageInput>
            </ChatContainer>
        </MainContainer>
    </RightContainer>
  )
}

export default SingleChat