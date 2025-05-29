// import Constants from 'expo-constants'

// const host =
//   // SDK ≥ 48 için:
//   Constants.manifest?.debuggerHost?.split(':')[0] ??
//   // SDK < 48 için:
//   (Constants.manifest as any).debuggerHost?.split(':')[0] ??
//   'localhost'

// export const API_BASE = `http://${host}:5184/api`


// import Constants from 'expo-constants';
// import { Platform } from 'react-native';

// function getDevHost() {
//   // Metro bundler’ın verdiği “IP:port” bilgisini parçala
//   const debuggerHost = (Constants.manifest as any)?.debuggerHost;
//   if (debuggerHost) {
//     return debuggerHost.split(':')[0];
//   }
//   // Yine de olmazsa, iOS için localhost, Android fiziksel cihazda da LAN IP gelmesi gerekir
//   return Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
// }

// const HOST = getDevHost();
// //export const API_BASE = `http://${HOST}:5184/api`;

export const API_BASE = "http://192.168.53.129:5184/api"
