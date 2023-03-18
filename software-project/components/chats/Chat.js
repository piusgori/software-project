import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const Chat = ({ chat }) => {

    const minute = new Date(chat.time).getMinutes() < 10 ? `0${new Date(chat.time).getMinutes()}` : new Date(chat.time).getMinutes();
    const hour = new Date(chat.time).getHours() < 10 ? `0${new Date(chat.time).getHours()}` : new Date(chat.time).getHours();

    const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => { navigation.navigate('SingleChat', { chat }) }} style={styles.container}>
      <View style={styles.firstContainer}>
        <View style={styles.imageContainer}><Image style={styles.image} source={{ uri: chat.image }}></Image></View>
        <View style={styles.detailsContainer}>
            <Text style={styles.name}>{chat.name}</Text>
            <Text>{chat.message}</Text>
        </View>
      </View>
      <Text style={styles.time}>{hour}:{minute}</Text>
    </TouchableOpacity>
  )
}

export default Chat;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12,
    },
    detailsContainer: {
        justifyContent: 'space-between',  
    },
    firstContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    imageContainer: {
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginRight: 20
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10
    },
    time: {
        paddingLeft: 20
    }
})