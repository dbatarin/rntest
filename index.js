import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'mobx-react';
import App from './App';
import {name as appName} from './app.json';
import stores from './src/stores';

if (__DEV__) {
  require('./ReactotronConfig');
}

const Screens = () => (
  <Provider {...stores}>
    <App screenProps={{...stores}} />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Screens);
