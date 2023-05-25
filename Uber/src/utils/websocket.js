import axios from 'axios';
import {Centrifuge} from 'centrifuge';
// import ws from 'ws';

// const connect = async () => {
//   try {
//     // const token = await getToken();
//     // console.log('TOKEN ', token);
//     const centrifuge = new Centrifuge(
//       'ws://34.132.233.19:8000/ws/bodi',
//       // {
//       //   token: token,
//       // },
//     );

//     centrifuge.on('connected', ctx => {
//       console.log('centrifuge.connect', ctx);
//     });

//     centrifuge.on('connecting', ctx => {
//       console.log('centrifuge.connecting', ctx);
//     });

//     centrifuge.on('disconnected', function (ctx) {
//       // do whatever you need in case of disconnect from server
//       console.log('centrifuge.disconnected', ctx);
//     });

//     centrifuge.on('error', function (ctx) {
//       console.log('error', ctx);
//     });

//     centrifuge.connect();

//     return centrifuge;
//   } catch (error) {
//     console.log(error);
//   }
// };

const connect = async (driver_name) => {
  try {
    var ws = new WebSocket(`ws://34.67.156.51:8000/ws/${driver_name}`);
    
    
    ws.onmessage = e => {
      // a message was received
      console.log('on message ', e.data);
    };
    
    ws.onerror = e => {
      // an error occurred
      console.log('on error ',e.message);
    };
    
    ws.onclose = e => {
      // connection closed
      console.log('onclose ', e.code, e.reason);
    };
    return ws;
  } catch (error) {
    console.log(error);
  }
}

export default connect;
