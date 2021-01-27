import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA-PRrLezsGHgHNY8FWQ5FjsFEuYNSWVSg',
  authDomain: 'instagram-native-3f222.firebaseapp.com',
  projectId: 'instagram-native-3f222',
  storageBucket: 'instagram-native-3f222.appspot.com',
  messagingSenderId: '552086268871',
  appId: '1:552086268871:web:a3ed181c12b4e46dec07e2',
  measurementId: 'G-RZ1ZTGMTBX',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
