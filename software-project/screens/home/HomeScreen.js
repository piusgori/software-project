import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { frameworks, questions } from '../../utils/data';
import TopFramework from '../../components/home/TopFramework';
import Question from '../../components/home/Question';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Frameworks</Text>
      <View style={{ marginBottom: 10 }}>
        {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal>{frameworks.map((each, index) => <TopFramework key={index} framework={each}></TopFramework>)}</ScrollView> */}
      </View>
      <Text style={styles.title}>Top Questions For You</Text>
      <ScrollView>
        {questions.map((each, index) => <Question key={index} question={each}></Question>)}
      </ScrollView>
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    flex: 1
  },
  questionsContainer: {
    flex: 1
  },
  title: {
    marginVertical: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '500'
  }
})