/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import NavigationWrapper from './components/NavigationWrapper';
import {AppProvider} from './components/AppContext';

const App: () => React$Node = () => {
  return (
    <AppProvider>
      <NavigationWrapper />
    </AppProvider>
  );
};

export default App;
