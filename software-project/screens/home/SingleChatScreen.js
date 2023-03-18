import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import ChatImage from '../../components/chats/ChatImage';

const SingleChatScreen = () => {

    const { chat } = useRoute().params;
    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({ 
            headerTitle: chat.name,
            headerLeft: () => <ChatImage image={chat.image}></ChatImage>
         })
    }, [])

  return (
    <GiftedChat></GiftedChat>
  )
}

export default SingleChatScreen