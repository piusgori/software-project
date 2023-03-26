import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';
import TopBar from '../../components/interface/TopBar';
import AppDrawer from '../../components/interface/AppDrawer';
import ChatList from '../../components/chats/ChatList';
import SingleChat from '../../components/chats/SingleChat';

const MainBox = styled(Box)(() => ({
    height: '100vh',
    width: '100%',
}));

const ChatsContainer = styled(Box)(() => ({
    height: '92%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const ChatsPage = () => {

    const theme = useTheme();
    const isScreenSmall = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <MainBox>
        <TopBar />
        <AppDrawer />
        <ChatsContainer>
            <ChatList />
            {!isScreenSmall && <SingleChat />}
        </ChatsContainer>
    </MainBox>
  )
}

export default ChatsPage;