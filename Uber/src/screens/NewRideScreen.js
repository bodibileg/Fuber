import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  Text,
  View,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

navigator.geolocation = require('@react-native-community/geolocation');

function NewRideScreen({route}) {
  const {
    pickup_lat,
    pickup_lng,
    destination_lat,
    destination_lng,
    customer_id,
    customer_name,
    customer_pickup_text,
    distance,
  } = route.params;

  const getUrl = (
    starting_lat,
    starting_lng,
    destination_lat,
    destination_lng,
    pickup_lat,
    pickup_lng,
  ) => {
    const scheme = Platform.select({
      ios: 'maps://app?saddr=',
      android: 'google.navigation:q=',
    });
    const latLng = `${starting_lat},${starting_lng}`;
    const deslatLng = `${destination_lat},${destination_lng}`;
    const pickUpLatLng = `${pickup_lat},${pickup_lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `https://www.google.com/maps/dir/${latLng}/${pickUpLatLng}/${deslatLng}`,
      // ios: `${scheme}${label}@${latLng}&daddr=${deslatLng}&dirflg=d&addr=${pickUpLatLng}`,
      android: `https://www.google.com/maps/dir/${latLng}/${pickUpLatLng}/${deslatLng}`,
      // android: `${scheme}${latLng}(${label})`,
    });
    console.log('url ', url);
    return url;
  };

  const openMaps = async (
    pickup_lat,
    pickup_lng,
    destination_lat,
    destination_lng,
  ) => {
    await Geolocation.getCurrentPosition(
      res => {
        const lat = res.coords.latitude;
        const lng = res.coords.longitude;
        const url = getUrl(
          lat,
          lng,
          pickup_lat,
          pickup_lng,
          destination_lat,
          destination_lng,
        );
        console.log(url);
        Linking.openURL(url);
      },
      console.log,
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 0},
    );
  };

  const handlePress = () => {
    openMaps(pickup_lat, pickup_lng, destination_lat, destination_lng);
  };

  const getDistance = distance => {
    const feetPerMile = 5280;
    console.log('========== type', typeof distance);
    if (distance >= 0.5) {
      return distance.toFixed(1) + ' miles';
    } else {
      return Math.round(distance * feetPerMile) + ' feet';
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{backgroundColor: 'black', padding: 20, borderRadius: 20}}>
        <Text style={styles.textBold}>Customer Id: {customer_id}</Text>
        <Text style={styles.textBold}>Customer name: {customer_name}</Text>
        <Text></Text>
        <Text style={styles.textBold}>
          Pickup Location: {customer_pickup_text}
        </Text>
        <Text></Text>
        <Text style={styles.textBold}>Distance: {getDistance(distance)}</Text>
        <TouchableOpacity
          onPress={handlePress}
          style={{
            borderWidth: 1,
            borderColor: '#fff',
            borderRadius: 5,
            padding: 10,
            width: 100,
            margin: 20,
          }}>
          <Text style={styles.textBold}>Start</Text>
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

export default NewRideScreen;
