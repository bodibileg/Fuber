import Geolocation from '@react-native-community/geolocation';
import React, {useCallback, useState} from 'react';
import {Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import api from '../api/axios';
import {useFocusEffect} from '@react-navigation/native';

navigator.geolocation = require('@react-native-community/geolocation');

function RideMap() {
  const [region, setRegion] = useState({
    latitude: 41.018418971604085,
    longitude: -91.9684085532281,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
  });
  const [cars, setCars] = useState([]);

  useFocusEffect(
    useCallback(() => {
      Geolocation.getCurrentPosition(
        res => {
          setRegion({
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.01,
          });
        },
        console.log,
        {enableHighAccuracy: true, timeout: 2000, maximumAge: 0},
      );
      //get current position and  fetch cars every second
      const interval = setInterval(getPositions, 1000);
      // console.log('setting interval ' + interval);

      return () => {
        //clear interval
        // console.log('clearing interval');
        clearInterval(interval);
      };
    }, []),
  );

  const getPositions = () => {
    Geolocation.getCurrentPosition(
      res => {
        // console.log(res);
        api
          .get('drivers_in_radius', {
            params: {
              latitude: res.coords.latitude,
              longitude: res.coords.longitude,
              radius_in_mile: 3,
            },
            headers: {
              service: 'location',
            },
          })
          .then(function (response) {
            const data = response.data.data.drivers;
            // console.log('data ', data);
            setCars(data);
          })
          .catch(function (error) {
            console.log('error ', error);
            console.log('error message ', error.message);
          });
      },
      console.log,
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 0},
    );
  };

  const getImage = type => {
    // if (type === 'UberXL') {
    //   return require('../assets/images/map-suv-2.png');
    // }
    return require('../assets/images/map-uberx-2.png');
  };

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      region={region}
      userLocationUpdateInterval={1000}
      showsMyLocationButton={true}
      showsPointsOfInterest={true}
      loadingEnabled={true}
      showsCompass={true}
      showsUserLocation={true}>
      {cars.map(marker => (
        <Marker
          key={marker.driver_name + marker.device_id}
          coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
          title={marker.type}>
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
              transform: [
                {
                  rotate: `${marker.heading}deg`,
                },
              ],
            }}
            source={getImage(marker.type)}
          />
        </Marker>
      ))}
    </MapView>
  );
}

export default RideMap;
