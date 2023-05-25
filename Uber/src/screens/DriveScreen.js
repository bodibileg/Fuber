import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Map from '../components/RideMap';
import Geolocation from '@react-native-community/geolocation';
import connect from '../utils/websocket';
import {getUniqueId} from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import connectCentrifuge from '../utils/centrifuge';
import api from '../api/axios';

navigator.geolocation = require('@react-native-community/geolocation');

function DriveScreen({navigation}) {
  const [online, setOnline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [websocket, setWebsocket] = useState(null);
  const [centrifuge, setCentrifuge] = useState(null);
  const [subscription, setSub] = useState(null);
  let interval;

  useFocusEffect(
    useCallback(() => {
      if (websocket) interval = setInterval(sendLocation, 1000);

      return () => {
        //clear interval
        // console.log('clearing interval ', interval);
        if (websocket) clearInterval(interval);
        if (websocket) {
          // console.log('closing websocket');
          websocket.close();
          getUniqueId()
            .then(deviceId => {
              AsyncStorage.getItem('userId')
                .then(userId => {
                  api
                    .delete(`/drivers/driver-${userId}/${deviceId}`, {
                      headers: {
                        service: 'location',
                      },
                    })
                    .then(response => {
                      // console.log('response ===== ', response.data);
                    })
                    .catch(error => {
                      console.log(error);
                    });
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log(error);
            });
        }
      };
    }, [websocket]),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (centrifuge) {
          // console.log('closing centrifuge');
          centrifuge.disconnect();
        }
      };
    }, [centrifuge]),
  );

  useEffect(() => {
    if (centrifuge && websocket) {
      // console.log('centrifuge and websocket both are connected');
      setLoading(false);
      setOnline(true);
    }
  }, [centrifuge, websocket]);

  const sendLocation = async () => {
    try {
      const deviceId = await getUniqueId();
      // console.log('deviceId ', deviceId);
      const driver_name = 'driver-' + (await AsyncStorage.getItem('userId'));
      // console.log('driver name ', driver_name);

      Geolocation.getCurrentPosition(
        res => {
          const latitude = res.coords.latitude;
          const longitude = res.coords.longitude;
          try {
            if (websocket) {
              const data = {
                driver_name: driver_name,
                device_id: deviceId,
                latitude: latitude,
                longitude: longitude,
              };
              // console.log('sending data ', data);
              websocket.send(JSON.stringify(data));
            }
          } catch (error) {
            console.log('catch error', error);
          }
        },
        console.log,
        {enableHighAccuracy: true, timeout: 2000, maximumAge: 0},
      );
    } catch (error) {
      console.log(error);
    }
  };

  const connectWebSocket = async () => {
    //loading animation
    setLoading(true);

    //get device id
    const driver_id = await AsyncStorage.getItem('userId');
    const driver_name = 'driver-' + driver_id;
    const deviceId = await getUniqueId();
    // console.log('driver name ', driver_name);

    const ws = await connect(driver_name);
    ws.onopen = () => {
      // connection opened
      console.log('connected to websocket');
      setWebsocket(ws);
      // if (centrifuge) {
      //   setOnline(true);
      //   setLoading(false);
      // }
    };

    //connect to centrifuge
    // console.log('connecting to centrifuge');
    const centrifuge = await connectCentrifuge(driver_id);
    // console.log('centrifuge ', centrifuge);
    //execute when connected
    centrifuge.on('connected', function (ctx) {
      console.log('connected to centrifuge');
      setCentrifuge(centrifuge);
      // if (websocket) {
      //   setOnline(true);
      //   setLoading(false);
      // }
    });

    centrifuge.on('disconnected', function (ctx) {
      console.log('disconnected from centrifuge');
    });
    //subscribe to a channel
    const sub = centrifuge.newSubscription('driver-' + deviceId);
    sub.subscribe();
    sub.on('publication', function (ctx) {
      // handle new Publication data coming from channel "driver-name".
      // console.log('subscription data ==== ', ctx.data);
      if (ctx.data['command'] === 'customer_found') {
        const {
          pickup_lat,
          pickup_lng,
          destination_lat,
          destination_lng,
          customer_id,
          customer_name,
          customer_pickup_text,
          distance,
        } = ctx.data;
        console.log(
          'opening maps',
          pickup_lat,
          pickup_lng,
          destination_lat,
          destination_lng,
          customer_id,
          customer_name,
          distance,
        );
        navigation.navigate('NewRide', {
          pickup_lat,
          pickup_lng,
          destination_lat,
          destination_lng,
          customer_id,
          customer_name,
          distance,
          customer_pickup_text,
        });
      }
    });

    setSub(sub);
    // setCentrifuge({centrifuge: 'centrifuge'});
  };

  return (
    <View>
      <Map />
      <View
        style={{
          position: 'absolute',
          top: 30,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            backgroundColor: 'black',
            width: 120,
            height: 40,
            padding: 10,
            borderRadius: 20,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            <Text style={{color: 'green', fontSize: 15}}>$ </Text>0.00
          </Text>
        </View>
      </View>
      {!online ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 50,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={connectWebSocket}>
            <Text style={{color: 'white', fontSize: 30}}>GO</Text>
          </TouchableOpacity>
        </View>
      ) : loading ? (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'grey',
          }}>
          <ActivityIndicator size="small" color="white" />
        </View>
      ) : (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
          }}>
          <Text style={{color: 'white', fontSize: 24, fontWeight: 'bold'}}>
            You are online
          </Text>
        </View>
      )}
    </View>
  );
}

export default DriveScreen;
