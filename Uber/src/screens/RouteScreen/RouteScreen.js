import React, { useState } from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import RouteMap from '../../components/RouteMap';
import TypesRow from './TypesRow';
import styles from './styles';

const types = [
  {id: 1, type: 'UberX', price: 20},
  {id: 2, type: 'UberXL', price: 25},
];

function RouteScreen({navigation, route}) {
  const [selectedType, setSelectedType] = useState('UberX');

  const select = (type) => {
    setSelectedType(type);
  }
  // console.log('PARAMS=======', route.params);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 2}}>
        <RouteMap
          origin={route.params.PICKUP}
          destination={route.params.DEST}
        />
      </View>
      <View
        style={styles.container}>
          {
            types.map(type => <TypesRow type={type.type} isSelected={type.type === selectedType} price={type.price} key={type.id} onPress={() => select(type.type)}/>)
          }
        <Pressable
          onPress={() => {console.log(selectedType)}}
          style={styles.chooseButton}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Choose {selectedType}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default RouteScreen;
