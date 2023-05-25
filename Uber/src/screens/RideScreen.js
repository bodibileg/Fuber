import React, { useState } from 'react';
import {Text, View} from 'react-native';
import Search from '../components/Search';
import Map from '../components/RideMap';

const RideScreen = ({navigation}) => {

  const handleSearch = () => {
    navigation.navigate('Search');
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 2, backgroundColor: 'red'}}>
        <Map />
        <View style={{position: 'absolute', top: 0, width: '100%'}}>
          <Search
            handleClick={handleSearch}
          />
        </View>
      </View>
    </View>
  );
};

export default RideScreen;
