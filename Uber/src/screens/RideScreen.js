import React from 'react';
import {Text, View} from 'react-native';
import Search from '../components/Search';
import Map from '../components/Map';

const RideScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 2, backgroundColor: 'red'}}>
        <Map />
        <View style={{position: 'absolute', top: 0, width: '100%'}}>
          <Search navigation={navigation} border={true} />
        </View>
      </View>
    </View>
  );
};

export default RideScreen;
