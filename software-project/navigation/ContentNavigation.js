import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/home/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const BottomTab = createMaterialBottomTabNavigator();

const ContentNavigation = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name='Home' component={HomeScreen} options={{ tabBarIcon: ({ size, color }) => <Ionicons name='home' size={size} color={color}></Ionicons> }}></BottomTab.Screen>
      <BottomTab.Screen name='Profile' component={ProfileScreen} options={{ tabBarIcon: ({ size, color }) => <Ionicons name='person' size={size} color={color}></Ionicons> }}></BottomTab.Screen>
    </BottomTab.Navigator>
  )
}

export default ContentNavigation