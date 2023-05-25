import React from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {Dimensions, View} from 'react-native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.03;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function RouteMap({origin, destination}) {

  const originLoc = {
    latitude: origin.lat,
    longitude: origin.lng,
  };

  const destinationLoc = {
    latitude: destination.lat,
    longitude: destination.lng,
  };

  const routeLat =
    (originLoc.latitude +
      destinationLoc.latitude) /
    2;
  const routeLong =
  (originLoc.longitude +
    destinationLoc.longitude) /
  2;

  const region = {
    latitude: routeLat,
    longitude: routeLong,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      initialRegion={region}>
      <MapViewDirections
        origin={originLoc}
        destination={destinationLoc}
        apikey="AIzaSyCHzecuGIkJDXXcp2DMt5Pr5qF6T5TaDnk"
        strokeWidth={5}
        strokeColor="black"
      />
      <Marker coordinate={originLoc} title="origin">
        <View
          style={{
            width: 15,
            height: 15,
            backgroundColor: '#FFF',
            borderColor: 'black',
            borderRadius: 7.5,
            borderWidth: 5,
          }}
        />
      </Marker>
      <Marker coordinate={destinationLoc} title="destination">
        <View
          style={{
            width: 15,
            height: 15,
            backgroundColor: '#FFF',
            borderColor: 'black',
            borderWidth: 5,
          }}
        />
      </Marker>
    </MapView>
  );
}

export default RouteMap;
