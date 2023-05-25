import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import {getUniqueId} from 'react-native-device-info';

navigator.geolocation = require('@react-native-community/geolocation');

const sendLocation = async sub => {
  try {
    const deviceId = await getUniqueId();
    // console.log('deviceId ', deviceId);
    const driver_name = 'bodi';

    Geolocation.getCurrentPosition(
      res => {
        const latitude = res.coords.latitude;
        const longitude = res.coords.longitude;
        heading = res.coords.heading;
        try {
          console.log('sub ', sub);
          if (sub) {
            const data = {
              driver_name: driver_name,
              device_id: deviceId,
              latitude: latitude,
              longitude: longitude,
            };
            console.log('sending data ', data);
            sub.send(JSON.stringify(data));
          }
        } catch (error) {
          console.log('catch error', error);
        }
        // console.log('heading ', heading);
        //   console.log('latitude ', latitude);
        // console.log('longitude ', longitude);

        // axios
        //   .post('http://173.255.116.124/drivers', {
        //     driver_name: driver_name,
        //     device_id: deviceId,
        //     latitude: latitude,
        //     longitude: longitude,
        //   })
        //   .then(function (response) {
        //   //   console.log('location service response = ', response.data);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        // centrifuge.connect();
      },
      console.log,
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 0},
    );
  } catch (error) {
    console.log(error);
  }
};

export {sendLocation};
