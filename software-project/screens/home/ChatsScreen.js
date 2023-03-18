import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react';
import Chat from '../../components/chats/Chat';
import { chats } from '../../utils/data';

const ChatsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {chats.map((each, index) => <Chat key={index} chat={each}></Chat>)}
    </ScrollView>
  )
}

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  }
})