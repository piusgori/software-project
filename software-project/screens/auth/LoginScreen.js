import { View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';

const LoginScreen = () => {

    const GitIcon = () => <AntDesign name='github'></AntDesign>
    const navigation = useNavigation();

    const [form, setForm] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(true);

    const loginHandler  = () => {
      try {
        setIsLoading(true);
        console.log(form);
        //make api-request;
         
        // set global user and navigate
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false)
      }
    };

    useEffect(() => {
      setDisabled((!form.email.includes('@')) || (form.password.length < 5));
    }, [form])


    const goToSignUpHandler = () => {
      navigation.navigate('Signup');
    };

    const PasswordIcon = () => (
      <Ionicons name={showPassword ? 'eye' : 'eye-off'} onPress={() => setShowPassword(prev => !prev)} size={20}></Ionicons>
    )

    const MessageBar = () => (
      <Snackbar visible={visible} style={{ position: 'absolute', bottom: 16 }}>
        <View className='flex-row items-center justify-between'>
          <Text className={error ? 'text-red' : 'text-green'}>{error || "Logged In Successfully"}</Text>
          <Button onPress={() => setVisible(false)} variant='text' title='Okay'></Button>
        </View>
      </Snackbar>
    )

  return (
    <View className="flex-1 items-center justify-center bg-white py-20 px-10">
      <Image className="h-20 w-20 mb-5" source={require('../../assets/code.png')}></Image>
      <Text className="font-bold text-3xl mb-20">DevHub</Text>
      <Text className='mb-10 self-start text-4xl font-bold'>Log In</Text>
      <TextInput style={{ width: '100%', marginBottom: 20 }} variant='outlined' autoCapitalize='none' keyboardType='email-address' value={form.email} onChangeText={(e) => { setForm(prev => ({ ...prev, email: e })) }} placeholder='E-Mail Address'></TextInput>
      <TextInput style={{ width: '100%', marginBottom: 20 }} variant='outlined' secureTextEntry={showPassword} value={form.password} onChangeText={(e) => { setForm(prev => ({ ...prev, password: e })) }} placeholder='Password' trailing={PasswordIcon}></TextInput>
      {isLoading ? <ActivityIndicator color='blueviolet' size='large'></ActivityIndicator> : <>
        <Button disabled={disabled} onPress={loginHandler} title='Log In' style={{ marginBottom: 20, width: '50%' }}></Button>
        <Text className='mb-4 text-xl font-bold'>Or</Text>
        <Button style={{ marginBottom: 20 }} variant='outlined' leading={GitIcon} title='Continue With GitHub' titleStyle={{ color: 'white' }} className='w-max'></Button>
        <View className='flex-row items-center gap-6'>
          <Text>Don't Have An Account?</Text>
          <Button onPress={goToSignUpHandler} variant='text' title='Create Account' titleStyle={{ color: 'white' }}></Button>
        </View>
      </>}
      <MessageBar></MessageBar>
    </View>
  )
}

export default LoginScreen;