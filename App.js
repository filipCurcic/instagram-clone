import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';

import Main from './components/Main';
import Add from './components/main/Add';
import Save from './components/main/Save';

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

const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createStackNavigator();

export default function App({ navigation }) {
  const [loaded, setLoaded] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
        setLoaded(true);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <View className={styles.loading}>
        <Text> Loading </Text>
      </View>
    );
  }
  // if (!loggedIn) {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Navigator initialRouteName="Landing">
  //         <Stack.Screen
  //           name="Landing"
  //           component={Landing}
  //           options={{
  //             headerShown: false,
  //           }}
  //         />
  //         <Stack.Screen name="Register" component={Register} />
  //         <Stack.Screen name="Login" component={Login} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Add" component={Add} navigation={navigation} />
          <Stack.Screen name="Save" component={Save} navigation={navigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});
