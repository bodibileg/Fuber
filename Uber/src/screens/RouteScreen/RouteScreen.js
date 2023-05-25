import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import RouteMap from '../../components/RouteMap';
import TypesRow from './TypesRow';
import styles from './styles';
import api from '../../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import connectCentrifuge from '../../utils/centrifuge';
import { useFocusEffect } from '@react-navigation/native';

const types = [
  {id: 1, type: 'UberX', price: 20},
  {id: 2, type: 'UberXL', price: 25},
];

function RouteScreen({navigation, route}) {
  const [selectedType, setSelectedType] = useState('UberX');
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [centrifugeState, setCentrifuge] = useState(null);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('userId')
      .then(userId => {
        setCustomerId(userId);
      })
      .catch(error => {
        console.log(error);
      });
      return () => {
        if (centrifugeState) {
          centrifugeState.disconnect();
        }
      }
    }, [centrifugeState])
  )

  const select = type => {
    setSelectedType(type);
  };

  const requestRide = async () => {
    setLoading(true);
    const centrifuge = await connectCentrifuge(customerId);
    setCentrifuge(centrifuge);
    const sub = centrifuge.newSubscription('customer-' + customerId);
    sub.subscribe();
    sub.on('publication', function (ctx) {
      // handle new Publication data coming from channel "driver-name".
      console.log('subscription data ==== ', ctx.data);
      if (ctx.data['command'] === 'driver_found') {
        const {longitude, latitude, distance, device_id, driver_name} =
          ctx.data;
        console.log(
          'published data ===== ',
          longitude,
          latitude,
          driver_name,
          device_id,
          distance
        );
        setLoading(false);
        navigation.navigate('FoundDriver', {
          PICKUP: route.params.PICKUP,
          DRIVER: {lat: latitude, lng: longitude},
          DEST: route.params.DEST,
          type: selectedType,
          pickup_text: route.params.pickup_text,
          dest_text: route.params.dest_text,
          driver_name: driver_name,
          distance: distance,
        });
      }
    });
    console.log('requesting ride',{pickup_lat: route.params.PICKUP.lat,
    pickup_lng: route.params.PICKUP.lng,
    destination_lat: route.params.DEST.lat,
    destination_lng: route.params.DEST.lng,
    radius_in_mile: 5,
    customer_id: customerId,});
    setTimeout(() => {
      api
      .get('/v1/cabs', {
        params: {
          pickup_lat: route.params.PICKUP.lat,
          pickup_lng: route.params.PICKUP.lng,
          destination_lat: route.params.DEST.lat,
          destination_lng: route.params.DEST.lng,
          radius_in_mile: 5,
          customer_id: customerId,
          customer_name: 'customer-' + customerId,
          customer_pickup_text: route.params.pickup_text,
        },
        headers: {
          service: 'cab-request',
        },
      })
      .then(response => {
        console.log('cab request response ===== ', response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }, 1000);
    
    // navigation.navigate('Result', {PICKUP: route.params.PICKUP, DEST: route.params.DEST});
  };
  // console.log('PARAMS=======', route.params);

  if (loading) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 2}}>
        <RouteMap
          origin={route.params.PICKUP}
          destination={route.params.DEST}
        />
      </View>
      <View style={styles.container}>
        {types.map(type => (
          <TypesRow
            type={type.type}
            isSelected={type.type === selectedType}
            price={type.price}
            key={type.id}
            onPress={() => select(type.type)}
          />
        ))}
        <Pressable onPress={requestRide} style={styles.chooseButton}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            Choose {selectedType}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default RouteScreen;
