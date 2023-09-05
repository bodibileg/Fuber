import React from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchBar from '../components/Search';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Ride',
    image: require('../assets/images/UberX_v1.png'),
    destination: 'Ride',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Drive',
    icon: 'steering',
    destination: 'Drive',
  },
];
const handleItemClick = (navigation, dest) => {
  AsyncStorage.getItem('token')
    .then(token => {
      if (token) {
        navigation.navigate(dest);
      } else {
        navigation.navigate('Account', { screen: 'Login'});
      }
      // console.log(token);
    })
    .catch(err => {
      console.log(err);
    });
};

const Item = ({title, image, navigation, dest, icon}) => (
  <View
    style={{
      height: 100,
      width: 100,
      backgroundColor: '#F0F0F0',
      marginHorizontal: 10,
      borderRadius: 15,
    }}>
    <TouchableOpacity
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
      }}
      onPress={() => handleItemClick(navigation, dest)}>
      {image ? (
        <Image
          source={image}
          style={{width: 90, height: 80, resizeMode: 'contain'}}
        />
      ) : null}
      {icon ? (
        <Icon
          name={icon}
          size={60}
          style={{width: 90, height: 80, paddingTop: 15, paddingLeft: 20}}
        />
      ) : null}
      <Text style={{textAlign: 'center'}}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const HomeScreen = ({navigation}) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: 'white',
        height: '100%',
      }}>
      <SearchBar handleClick={() => handleItemClick(navigation, 'Search')}/>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          fontFamily: 'Avenir-Roman',
          marginLeft: 15,
          marginBottom: 15,
        }}>
        Suggestions:
      </Text>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <Item
            title={item.title}
            image={item.image}
            navigation={navigation}
            dest={item.destination}
            icon={item.icon}
          />
        )}
        keyExtractor={item => item.id}
        horizontal={true}
        style={{paddingHorizontal: 10}}
      />
    </View>
  );
};

export default HomeScreen;
