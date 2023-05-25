import axios from 'axios';
import {Centrifuge} from 'centrifuge';
import api from '../api/axios';

const getToken = id => {
  console.log('getToken id ', id);
  return new Promise((resolve, reject) => {
    api
      .post(
        'api/v1/socket/retrieve-token',
        {
          user_id: id,
        },
        {
          headers: {
            service: 'websocket',
          },
        },
      )
      .then(function (response) {
        console.log('getToken data', response.data.token);
        resolve(response.data.token);
      })
      .catch(function (error) {
        console.log('getToken error', error);
        reject(error);
      });
  });
};

const connectCentrifuge = async id => {
  try {
    console.log('from centrifuge.js id ', id);
    const token = await getToken(id);
    console.log('TOKEN ', token);
    const centrifuge = new Centrifuge(
      'ws://34.30.152.56:8000/connection/websocket',
      {
        token: token,
      },
    );

    centrifuge.on('connected', ctx => {
      console.log('centrifuge.connected', ctx);
    });

    centrifuge.on('connecting', ctx => {
      console.log('centrifuge.connecting', ctx);
    });

    centrifuge.on('disconnected', function (ctx) {
      // do whatever you need in case of disconnect from server
      console.log('centrifuge.disconnected', ctx);
    });

    centrifuge.on('error', function (ctx) {
      console.log('error', ctx);
    });

    centrifuge.connect();

    return centrifuge;
  } catch (error) {
    console.log(error);
  }
};

export default connectCentrifuge;
