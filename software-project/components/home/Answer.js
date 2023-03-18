import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';
import { Foundation } from '@expo/vector-icons';

const Answer = ({ answer }) => {

  return (
    <View style={styles.container}>
      <View style={styles.votesContainer}>
        <TouchableOpacity><Foundation name='arrow-up' size={26}></Foundation></TouchableOpacity>
        <Text style={styles.votes}>{answer.votes}</Text>
        <TouchableOpacity><Foundation name='arrow-down' size={26}></Foundation></TouchableOpacity>
      </View>
      <View style={styles.answerContainer}>
        <Text style={styles.text}>{answer.answer}</Text>
      </View>
    </View>
  )
}

export default Answer;

const styles = StyleSheet.create({
    answerContainer: {
        flex: 1
    },
    container: {
        width: '100%',
        padding: 20,
        elevation: 5,
        marginVertical: 12,
        flexDirection: 'row'
    },
    text: {
        marginBottom: 12
    },
    votes: {
        fontWeight: '500',
        fontSize: 20,
        marginVertical: 6
    },
    votesContainer: {
        paddingHorizontal: 12
    },
})