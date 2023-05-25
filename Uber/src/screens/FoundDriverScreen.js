import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import CountdownTimer from '../components/CountDownTimer';
import axios from 'axios';
import api from '../api/axios';

function FoundDriver({route, navigation}) {
  // function FoundDriver({driver_lat, driver_lng, user_lat, user_lng, pickup_text, dest_text}) {
  console.log('route.params.PICKUP ', route.params.PICKUP);
  console.log('route.params.DEST ', route.params.DEST);
  const driver_lat = route.params.DRIVER.lat;
  const driver_lng = route.params.DRIVER.lng;
  const user_lat = route.params.PICKUP.lat;
  const user_lng = route.params.PICKUP.lng;
  const dest_lat = route.params.DEST.lat;
  const dest_lng = route.params.DEST.lng;
  const pickup_text = route.params.pickup_text;
  const dest_text = route.params.dest_text;
  const driver_name = route.params.driver_name;

  const [loading, setLoading] = useState(true);
  const [eta, setEta] = useState(0);
  // const [price, setPrice] = useState('0');

  useEffect(() => {
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${driver_lat},${driver_lng}&destination=${user_lat},${user_lng}&key=AIzaSyCHzecuGIkJDXXcp2DMt5Pr5qF6T5TaDnk`;
    console.log(url);
    axios
      .get(url)
      .then(response => {
        console.log(
          'response duration ===== ',
          response.data.routes[0].legs[0].duration.value,
        );
        // console.log('response ===== ',
        // response.data.routes[0].legs[0]);
        const etaInSeconds = response.data.routes[0].legs[0].duration.value;
        setEta(etaInSeconds);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
    // setEta(100);
    // setLoading(false);
    // const params = {
    //   origin: `${driver_lat},${driver_lng}`,
    //   destination: `${dest_lat},${dest_lng}`,
    //   waypoints: `${user_lat},${user_lng}`,
    //   key: 'AIzaSyCHzecuGIkJDXXcp2DMt5Pr5qF6T5TaDnk',
    // };
    // console.log('params ======== ', params);
    // axios
    //   .get('https://maps.googleapis.com/maps/api/directions/json', {
    //     params: params,
    //   })
    //   .then(response => {
    //     console.log(
    //       'response.data.routes[0].legs[0].distance.value ======= ',
    //       response.data.routes[0].legs[0].distance,
    //     );
    //     setPrice(
    //       (response.data.routes[0].legs[0].distance.value / 500).toFixed(1) +
    //         '$',
    //     );
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }, []);

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 3958.8; // Radius of the Earth in miles
    const toRadians = degrees => {
      return degrees * (Math.PI / 180);
    };
    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    console.log('################ distance.distance.toFixed(2) ===== ', distance.toFixed(2));
    return distance.toFixed(2); // Round to 2 decimal places }
  }

  if (loading) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{backgroundColor: 'black', padding: 20, borderRadius: 20}}>
        <Text style={[styles.text, {fontSize: 50, marginBottom: 10}]}>
          <CountdownTimer initialSeconds={eta} />
        </Text>

        <Text style={styles.textBold}>Pickup Location: </Text>
        <Text style={styles.text}>{pickup_text}</Text>
        <Text style={styles.textBold}>Destination: </Text>
        <Text style={styles.text}>{dest_text}</Text>
        <Text style={styles.textBold}>
          Price:{' '}
          {(parseFloat(calculateDistance(user_lat, user_lng, driver_lat, driver_lng)) +
            parseFloat(calculateDistance(user_lat, user_lng, dest_lat, dest_lng))) *
            2 +
            '$'}
        </Text>
        <Text></Text>
        <Text style={styles.textBold}>Driver: {driver_name}</Text>
        <Text style={styles.text}>License Plate: MMX 620</Text>
        <Text style={styles.text}>Make: Toyota </Text>
        <Text style={styles.text}>Model: Corolla </Text>
        <Text style={styles.text}>Color: White </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 5,
            margin: 20,
            padding: 10,
            width: 150,
          }}
          onPress={() => {
            api
              .post(
                '/api/v1/socket/publish-message',
                {
                  topic: 'payments',
                  data: {
                    customer_id: '2',
                    customer_email: 'bya.mng@gmail.com',
                    driver_id: '3',
                    driver_email: 'bya.mng@gmail.com',
                    amount: (parseFloat(calculateDistance(user_lat, user_lng, driver_lat, driver_lng)) +
                    parseFloat(calculateDistance(user_lat, user_lng, dest_lat, dest_lng))) *
                    2 +
                    '$',
                    status: 'true',
                  },
                },
                {
                  headers: {
                    service: 'websocket',
                  },
                },
              )
              .then(response => {
                console.log('response ===== ', response.data);
              })
              .catch(error => {
                console.log(error);
              });
            api
              .post(
                '/api/v1/socket/publish-message',
                {
                  topic: 'notifications',
                  data: {
                    message:
                      'Your ride is complete! You will earn ' +
                      (parseFloat(calculateDistance(user_lat, user_lng, driver_lat, driver_lng)) +
            parseFloat(calculateDistance(user_lat, user_lng, dest_lat, dest_lng))) *
            2 +
            '$' +
                      ' for this ride.',
                    type: 'email',
                    meta: {address: 'bodibileg@gmail.com'},
                  },
                },
                {
                  headers: {
                    service: 'websocket',
                  },
                },
              )
              .then(response => {
                console.log('response ===== ', response.data);
              })
              .catch(error => {
                console.log(error);
              });
            navigation.navigate('HomeScreen');
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>
            Ride is Complete!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 20,
  },
  textBold: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FoundDriver;
