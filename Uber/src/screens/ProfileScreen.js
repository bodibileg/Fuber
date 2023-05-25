import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, SafeAreaView, Text, View} from 'react-native';

const ProfileScreen = ({navigation}) => {

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (!token) {
        navigation.navigate('Login');
      }
    });
  }, []);

  return (
    <SafeAreaView>
      <Text>This is B's profile</Text>
      <Button title='logout' onPress={() => {
        AsyncStorage.setItem('token', '');
        navigation.navigate('Login');
      }} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
