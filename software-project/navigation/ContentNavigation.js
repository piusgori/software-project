import React from 'react'
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/home/ProfileScreen';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatsScreen from '../screens/home/ChatsScreen';
import SingleQuestionScreen from '../screens/home/SingleQuestionScreen';
import SimilarQuestionsScreen from '../screens/home/SimilarQuestionsScreen';
import SingleChatScreen from '../screens/home/SingleChatScreen';

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name='Home' component={HomeScreen} options={{ tabBarIcon: ({ size, color }) => <Ionicons name='home' size={size} color={color}></Ionicons> }}></BottomTab.Screen>
      <BottomTab.Screen name='Chats' component={ChatsScreen} options={{ tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name='message-bulleted' size={size} color={color}></MaterialCommunityIcons> }}></BottomTab.Screen>
      <BottomTab.Screen name='Profile' component={ProfileScreen} options={{ tabBarIcon: ({ size, color }) => <Ionicons name='person' size={size} color={color}></Ionicons> }}></BottomTab.Screen>
    </BottomTab.Navigator>
  )
}

const ContentNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Main' component={BottomNavigator} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name='SingleQuestion' component={SingleQuestionScreen}></Stack.Screen>
      <Stack.Screen name='SimilarQuestions' component={SimilarQuestionsScreen}></Stack.Screen>
      <Stack.Screen name='SingleChat' component={SingleChatScreen}></Stack.Screen>
    </Stack.Navigator> 
  )
}

export default ContentNavigation