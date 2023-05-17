import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './HomeNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccountNavigator from './AccountNavigator';
import Icon from 'react-native-vector-icons/Foundation';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function Root() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Account') {
              iconName = 'torso';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'white',
            display: getRouteName(route),
          },
        })}>
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Account"
          component={AccountNavigator}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const tabHiddenRoutes = ['Ride', 'Drive', 'Search', 'Route'];

const getRouteName = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (tabHiddenRoutes.includes(routeName)) {
    return 'none';
  }
  return 'flex';
};

export default Root;
