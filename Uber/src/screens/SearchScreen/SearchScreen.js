import React, {useRef, useState, useEffect} from 'react';
import {TextInput, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import styles from './styles';
import PlaceRow from './PlaceRow';

navigator.geolocation = require('@react-native-community/geolocation');

function SearchScreen({navigation}) {
  const [pickUpLocation, setPickUp] = useState(null);
  const [destination, setDestination] = useState(null);

  const ref = useRef();

  const checkNavigate = () => {
    if(pickUpLocation && destination) navigation.navigate('Route', {PICKUP: pickUpLocation, DEST: destination});
  }
  useEffect(() => {
    checkNavigate();
  }, [pickUpLocation, destination]);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="Pickup location"
          enablePoweredByContainer={false}
          suppressDefaultStyles
          currentLocation={true}
          currentLocationLabel="Current location"
          styles={{
            textInput: {...styles.textInput, color: '#008AD8'},
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log('DATA: ', data);
            // console.log('DETAILS: ', details);
            setPickUp({data, details});
          }}
          fetchDetails
          query={{
            key: 'AIzaSyCm3PzIYU_CZ4X7B0Zcn6UD-EhuEpRI7GI',
            language: 'en',
          }}
          renderRow={data => <PlaceRow data={data} />}
        />
        <GooglePlacesAutocomplete
          ref={ref}
          placeholder="Where to?"
          enablePoweredByContainer={false}
          suppressDefaultStyles
          styles={{
            textInput: styles.textInput,
            container: {
              ...styles.autocompleteContainer,
              top: 55,
            },
            separator: styles.separator,
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log('DATA: ', data);
            // console.log('DETAILS: ', details);
            setDestination({data, details});
          }}
          fetchDetails
          query={{
            key: 'AIzaSyCm3PzIYU_CZ4X7B0Zcn6UD-EhuEpRI7GI',
            language: 'en',
          }}
          renderRow={data => <PlaceRow data={data} />}
        />

        {/* Circle near Origin input */}
        <View style={styles.circle} />

        {/* Line between dots */}
        <View style={styles.line} />

        {/* Square near Destination input */}
        <View style={styles.square} />
      </View>
    </View>
  );
}

export default SearchScreen;
