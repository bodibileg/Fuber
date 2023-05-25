import React, {useEffect, useState} from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

function AccountNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenPresent, setIsTokenPresent] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsTokenPresent(!!token);
        setIsLoading(false);
      } catch (error) {
        // Handle AsyncStorage error
        console.log(error);
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return <ActivityIndicator size={'large'} />;
  }

  return (
    <Stack.Navigator
      initialRouteName={isTokenPresent ? 'Profile' : 'Login'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default AccountNavigator;
