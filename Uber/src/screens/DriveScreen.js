import React from 'react';
import {Linking, Platform, Text, TouchableOpacity, View} from 'react-native';
import Map from '../components/Map';
import Geolocation from '@react-native-community/geolocation';

function DriveScreen() {
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

  const openMaps = async () => {
    let lat;
    let lng;
    await Geolocation.getCurrentPosition(res => {
      lat = res.coords.latitude;
      lng = res.coords.longitude;
      const url = getUrl(
        lat,
        lng,
        37.795679910514366,
        -122.39347113442659,
        37.78467502432232,
        -122.39716320798308,
      );
      console.log(url);
      Linking.openURL(url);
    });
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
          onPress={openMaps}>
          <Text style={{color: 'white', fontSize: 30}}>GO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DriveScreen;
