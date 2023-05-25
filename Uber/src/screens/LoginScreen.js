import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from '../api/axios';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (token) {
        console.log('Token:', token);
        navigation.navigate('Profile');
      }
    });
  }, []);

  const handleLogin = () => {
    // Perform login logic here
    console.log('email:', email);
    console.log('Password:', password);
    if (email === '' || password === '') {
      Alert.alert('Error', 'Username or password cannot be empty');
      return;
    }
    const data = {
      email,
      password,
    };
    api
      .post('api/v1/auth/login', data, {
        headers: {
          service: 'auth',
        },
      })
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          AsyncStorage.setItem('token', response.data.token);
          AsyncStorage.setItem('userId', "" + response.data.id);
          // AsyncStorage.setItem('user', JSON.stringify(response.data.user));
          // Alert.alert('Success ✅', 'Logged in successfully');
          navigation.navigate('Profile');
          navigation.navigate('Home', {screen: 'HomeScreen'});
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error', 'An error occurred, please try again!');
        setEmail('');
        setPassword('');
        setIsLoading(false);
      });
    // Reset the input fields
  };

  if (isLoading) {
    return (
      <View style={{justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="grey"
      />
      <Pressable onPress={handleLogin} style={styles.button}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>Login</Text>
      </Pressable>
      <Button
        title="Don't have an account? Register here"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: 'black',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default LoginScreen;
