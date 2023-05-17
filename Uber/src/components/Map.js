import Geolocation from '@react-native-community/geolocation';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

function Map() {
  const [region, setRegion] = useState({
    latitude: 41.018418971604085,
    longitude: -91.9684085532281,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01,
  });
  const [cars, setCars] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(res => {
      console.log(res);
      setRegion({
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.01,
      });
    });
    setCars([
      {
        id: 0,
        latitude: 37.786869964539775,
        longitude: -122.40505643423916,
        type: 'UberX',
        description: 'desc',
        heading: 20,
      },
      {
        id: 1,
        latitude: 37.78418206810804,
        longitude: -122.40471319936181,
        type: 'UberX',
        description: 'desc',
        heading: 90,
      },
      {
        id: 2,
        latitude: 37.78608140951319,
        longitude: -122.40928367136094,
        type: 'UberX',
        description: 'desc',
        heading: 180,
      },
      {
        id: 3,
        latitude: 37.78285082990335,
        longitude: -122.41034571331963,
        type: 'UberX',
        description: 'desc',
        heading: 270,
      },
    ]);
  }, []);

  const getImage = (type) => {
    if (type === 'UberX') {
      return require('../assets/images/map-uberx-2.png');
    }
    return require('../assets/images/map-suv-2.png');
  };

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      region={region}
      showsUserLocation={true}>
      {cars.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
          title={marker.type}
          description={marker.description}>
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

export default Map;
