import React, {useRef, useState, useEffect} from 'react';
import {TextInput, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import styles from './styles';
import PlaceRow from './PlaceRow';
// import {GOOGLE_MAPS_APIKEY} from '@env';
navigator.geolocation = require('@react-native-community/geolocation');

function SearchScreen({navigation}) {
  const [pickUpLocation, setPickUp] = useState(null);
  const [destination, setDestination] = useState(null);

  // const ref = useRef();

  const checkNavigate = () => {
    const pickup_text = pickUpLocation?.data?.formatted_address || pickUpLocation?.data?.description || pickUpLocation?.data?.vicinity;
    const dest_text = destination?.data?.formatted_address || destination?.data?.description || destination?.data?.vicinity;
    if(pickUpLocation && destination) navigation.navigate('Route', {PICKUP: pickUpLocation.details.geometry.location, DEST: destination.details.geometry.location, pickup_text: pickup_text, dest_text: destination.data.description});
  }
  useEffect(() => {
    checkNavigate();
  }, [pickUpLocation, destination]);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <GooglePlacesAutocomplete
          // ref={ref}
          placeholder="Pickup location"
          textInputProps={{
            placeholderTextColor: 'grey',
          }}
          enableHighAccuracyLocation={true}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          currentLocation={true}
          currentLocationLabel="Current location"
          nearbyPlacesAPI="GoogleReverseGeocoding"
          styles={{
            textInput: {...styles.textInput, color: '#008AD8'},
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
          }}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // console.log('======= DATA: ', data);
            // console.log('======= DETAILS: ', details);
            // console.log('PICKUP ', data.description);
            setPickUp({data, details});

          }}
          fetchDetails
          query={{
            key: 'AIzaSyCHzecuGIkJDXXcp2DMt5Pr5qF6T5TaDnk',
            language: 'en',
            components: 'country:us',
          }}
          renderRow={data => <PlaceRow data={data} />}
        />
        <GooglePlacesAutocomplete
          // ref={ref}
          placeholder="Where to?"
          enablePoweredByContainer={false}
          enableHighAccuracyLocation={true}
          suppressDefaultStyles
          nearbyPlacesAPI="GoogleReverseGeocoding"
          textInputProps={{
            placeholderTextColor: 'grey',
          }}
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
            console.log('======= DATA: ', data);
            console.log('======= DETAILS: ', details);
            setDestination({data, details});
          }}
          fetchDetails
          query={{
            key: 'AIzaSyCHzecuGIkJDXXcp2DMt5Pr5qF6T5TaDnk',
            language: 'en',
            components: 'country:us',
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
