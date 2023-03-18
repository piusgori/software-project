import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import TimeAgo from 'react-native-timeago';
import * as NumberFormat from 'easy-number-formatter';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Answer from '../../components/home/Answer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { questions } from '../../utils/data';

const SingleQuestionScreen = () => {
    const { id } = useRoute().params;
    const foundQuestion = questions.find(e => e.id === id);
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{foundQuestion.title}</Text>
      <View style={styles.details}>
        <Text>Number Of Views: {NumberFormat.formatNumber(foundQuestion.views)}</Text>
        <View style={styles.iconAndText}>
            <Text style={{ marginRight: 12 }}>Time Posted:</Text>
            <TimeAgo time={foundQuestion.date}></TimeAgo>
        </View>
      </View>
      <Text style={styles.text}>{foundQuestion.question}</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.eachAction}><MaterialCommunityIcons name='message-bulleted' size={26}></MaterialCommunityIcons></TouchableOpacity>
        <TouchableOpacity style={styles.eachAction}><FontAwesome name='user' size={26}></FontAwesome></TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.navigate('SimilarQuestions') }} style={styles.eachAction}><MaterialIcons name='read-more' size={26}></MaterialIcons></TouchableOpacity>
      </View>
      <Text style={styles.title}>Answers</Text>
      <ScrollView>
        {foundQuestion.answers.map((each, index) => <Answer key={index} answer={each}></Answer>)}
      </ScrollView>
    </View>
  )
}

export default SingleQuestionScreen;

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 12
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20
    },
    details: {
        marginVertical: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    eachAction: {
        marginHorizontal: 10
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