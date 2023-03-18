import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { Foundation, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ChatImage = ({ image }) => {

    const navigation = useNavigation();

  return (
    <View style={styles.overallContainer}>
        <TouchableOpacity onPress={() => { navigation.goBack() }}><AntDesign name='arrowleft' size={24}></AntDesign></TouchableOpacity>
        <View style={styles.container}><Image style={styles.image} source={{ uri: image }}></Image></View>
    </View>
  )
}

export default ChatImage;

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginHorizontal: 20
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    overallContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
})