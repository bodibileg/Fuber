import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import api from '../api/axios';
import axios from 'axios';

function ResultScreen({route}) {
  const [loading, setLoading] = useState(true);

  const pickUpLocation = route.params.PICKUP;
  const destinationLocation = route.params.DEST;

  useEffect(() => {
    axios.get('http://34.135.114.156:8080/v1/cabs', {
        params: {
            pickup_lat: pickUpLocation.latitude,
            pickup_lng: pickUpLocation.longitude,
            destination_lat: destinationLocation.latitude,
            destination_lng: destinationLocation.longitude,
            radius_in_mile: 5,
            customer_id: 123,
        }
    }).then(response => {
        console.log('response ===== ' , response);
        setLoading(false);
    }).catch(error => {
        console.log(error);
    });
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Text>Result Screen</Text>
      )}
    </View>
  );
}

export default ResultScreen;
