import { View, Text, Image } from 'react-native'
import React from 'react';
import { Button } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {

  const navigation = useNavigation();

  const goToLoginHandler = () => { navigation.navigate('Login') };

  const goToSignupHandler = () => { navigation.navigate('Signup') }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Image className="h-20 w-20 mb-10" source={require('../../assets/code.png')}></Image>
      <Text className="text-purple font-bold text-3xl mb-20">Welcome To DevHub</Text>
      <View className="flex-row items-center justify-center">
        <Button onPress={goToLoginHandler} style={{ marginRight: 20 }} title='Login' titleStyle={{ color: 'black' }} variant='outlined'></Button>
        <Text>Or</Text>
        <Button onPress={goToSignupHandler} style={{ marginLeft: 20 }} title='Signup' variant='contained'></Button>
      </View>
    </View>
  )
}

export default WelcomeScreen;