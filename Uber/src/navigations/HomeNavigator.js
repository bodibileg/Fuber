import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import RideScreen from '../screens/RideScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import DriveScreen from '../screens/DriveScreen';
import RouteScreen from '../screens/RouteScreen/RouteScreen';

const Stack = createNativeStackNavigator();
function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName='Route'>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen
        name="Ride"
        component={RideScreen}
        options={{
          title: 'Ride',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Drive"
        component={DriveScreen}
        options={{
          title: 'Drive',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{title: 'Plan your ride'}}
      />
      <Stack.Screen
        name="Route"
        component={RouteScreen}
        // options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
