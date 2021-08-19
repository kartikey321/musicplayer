// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MusicPlayer from './src/screens/MusicPlayer';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import HomePage from './src/screens/HomePage';
import Artists from './src/tabs/Artists';
import ArtistInfo from './src/screens/ArtistInfo';
import Tracks from './src/tabs/Tracks';

const initialState = {
  primaryColor: '#fff',
  primaryTextColor: 'black',
};

const store = configureStore({
  reducer: state => state,
  preloadedState: initialState,
});

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Artists">
          <Stack.Screen
            name="MusicPlayer"
            component={MusicPlayer}
            options={{header: () => null}}
          />
          <Stack.Screen name="Artists" component={Artists} />
          <Stack.Screen
            name="ArtistInfo"
            component={ArtistInfo}
            options={{header: () => null}}
          />
          <Stack.Screen
            name="Tracks"
            component={Tracks}
            options={{header: () => null}}
          />
          <Stack.Screen name="HomePage" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
