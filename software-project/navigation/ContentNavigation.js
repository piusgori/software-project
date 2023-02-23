import React from 'react'
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/home/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

const ContentNavigation = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name='Home' component={HomeScreen} options={{ tabBarIcon: ({ size, color }) => <Ionicons name='home' size={size} color={color}></Ionicons> }}></BottomTab.Screen>
      <BottomTab.Screen name='Profile' component={ProfileScreen} options={{ tabBarIcon: ({ size, color }) => <Ionicons name='person' size={size} color={color}></Ionicons> }}></BottomTab.Screen>
    </BottomTab.Navigator>
  )
}

export default ContentNavigation