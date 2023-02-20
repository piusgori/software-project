import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Welcome' component={WelcomeScreen}></Stack.Screen>
        <Stack.Screen name='Login' component={LoginScreen}></Stack.Screen>
        <Stack.Screen name='Signup' component={SignupScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default AuthNavigation