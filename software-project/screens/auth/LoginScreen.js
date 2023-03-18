import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';
import * as AuthSession from 'expo-auth-session';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../../keys';
import axios from 'axios';
import { AuthContext } from '../../services/auth-context';

const LoginScreen = () => {

    const GitIcon = () => <AntDesign name='github'></AntDesign>
    const navigation = useNavigation();
    const { setIsAuth } = useContext(AuthContext);

    const [form, setForm] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [accessToken, setAccessToken] = useState(null);


    const goToSignUpHandler = () => {
      navigation.navigate('Signup');
    };

    const requestHandler  = async (data) => {
      try {
        console.log(data);
        //make api-request;
         
        // set global user and navigate
      } catch (err) {
        throw err;
      }
    };

    const pressHandler = async () => {
      try {
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(AuthSession.getDefaultReturnUrl())}`;
        const { type, params } = await AuthSession.startAsync({ authUrl });
        if(type !== 'success') throw new Error('An Error Has Occured');
        const tokenUrl = 'https://github.com/login/oauth/access_token';
        const { code } = params;
        const tokenResoponse = await AuthSession.exchangeCodeAsync(
          { code, redirectUri: AuthSession.getDefaultReturnUrl(), clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET },
          { tokenEndpoint: tokenUrl }
        );
        console.log(tokenResoponse.accessToken);
        const config = { headers: { Authorization: `Bearer ${tokenResoponse.accessToken}` } }
        const response = await axios.get('https://api.github.com/user', config);
        const { login, name, email } = response.data;
        console.log(response.data);
        return { email, password: login };
      } catch (err) {
        throw err;
      }
    };

    const loginHandler = async (method) => {
      try {
        setError();
        setVisible(false);
        setIsLoading(true);
        let githubForm;
        if(method === 'github') githubForm = await pressHandler();
        githubForm ? await requestHandler(githubForm) : await requestHandler(form);
        setVisible(true);
        setTimeout(() => {
          setVisible(false);
          setIsAuth(true);
        }, 3000)
      } catch (err) {
        setError('An Error Has Occured');
        setVisible(true);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    useEffect(() => {
      setDisabled((!form.email.includes('@')) || (form.password.length < 5));
    }, [form]);


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
    <ScrollView contentContainerStyle={styles.container}>
      <Image className="h-20 w-20 mb-5" source={require('../../assets/code.png')}></Image>
      <Text className="font-bold text-3xl mb-20">DevHub</Text>
      <Text className='mb-10 self-start text-4xl font-bold'>Log In</Text>
      <TextInput style={{ width: '100%', marginBottom: 20 }} variant='outlined' autoCapitalize='none' keyboardType='email-address' value={form.email} onChangeText={(e) => { setForm(prev => ({ ...prev, email: e })) }} placeholder='E-Mail Address'></TextInput>
      <TextInput style={{ width: '100%', marginBottom: 20 }} variant='outlined' secureTextEntry={showPassword} value={form.password} onChangeText={(e) => { setForm(prev => ({ ...prev, password: e })) }} placeholder='Password' trailing={PasswordIcon}></TextInput>
      {isLoading ? <ActivityIndicator color='blueviolet' size='large'></ActivityIndicator> : <>
        <Button disabled={disabled} onPress={() => loginHandler('email')} title='Log In' style={{ marginBottom: 20, width: '50%' }}></Button>
        <Text className='mb-4 text-xl font-bold'>Or</Text>
        <Button onPress={() => loginHandler('github')} style={{ marginBottom: 20 }} variant='outlined' leading={GitIcon} title='Continue With GitHub' titleStyle={{ color: 'black' }} className='w-max'></Button>
        <View className='flex-row items-center gap-6'>
          <Text>Don't Have An Account?</Text>
          <Button onPress={goToSignUpHandler} variant='text' title='Create Account' titleStyle={{ color: 'black' }}></Button>
        </View>
      </>}
      <MessageBar></MessageBar>
    </ScrollView>
  )
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white'
  }
})