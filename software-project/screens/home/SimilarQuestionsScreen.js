import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { questions } from '../../utils/data';
import Question from '../../components/home/Question';

const SimilarQuestionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Similar Questions</Text>
      <ScrollView>
        {questions.map((each, index) => <Question key={index} question={each}></Question>)}
      </ScrollView>
    </View>
  )
}

export default SimilarQuestionsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        flex: 1
    },
    title: {
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '500'
    }
})