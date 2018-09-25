import React from 'react';
import {createStackNavigator} from 'react-navigation';

import RapidFire from './RapidFire.js';
import Home from './Home.js';
import PlayGround from './PlayGround.js';

const App = createStackNavigator({
  Home: {screen: Home},
  RapidFire: {screen: RapidFire},
  PlayGround: {screen: PlayGround},
});

export default App;
