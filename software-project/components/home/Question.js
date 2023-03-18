import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import TimeAgo from 'react-native-timeago';
import * as NumberFormat from 'easy-number-formatter';
import { useNavigation } from '@react-navigation/native';

const Question = ({ question }) => {

    const navigation = useNavigation();

    const formattedNumber = NumberFormat.formatNumber(question.views);

    const navigationHandler = () => {
        navigation.navigate('SingleQuestion', { id: question.id });
    }

  return (
    <TouchableOpacity onPress={navigationHandler} style={styles.container}>
      <Text style={styles.title}>{question.title}</Text>
      <Text style={styles.text}>{question.question}</Text>
      <View style={styles.details}>
        <View style={styles.iconAndText}>
            <Ionicons name='timer' style={{ marginRight: 12 }} size={24}></Ionicons>
            <TimeAgo time={question.date}></TimeAgo>
        </View>
        <View style={styles.iconAndText}>
            <Ionicons name='eye' style={{ marginRight: 12 }} size={24}></Ionicons>
            <Text>{formattedNumber}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Question;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 12,
        elevation: 5,
        backgroundColor: 'white',
        marginVertical: 12
    },
    details: {
        marginVertical: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconAndText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginVertical: 12
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 12
    }
})