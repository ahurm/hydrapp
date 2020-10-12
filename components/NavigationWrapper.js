import React, {useState, useContext} from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {AppContext} from './AppContext';
import SettingsScreen from './layouts/SettingsScreen';
import HydrationScreen from './layouts/HydrationScreen';
import LogScreen from './layouts/LogScreen';

const Tab = createBottomTabNavigator();

const NavigationWrapper = () => {

  const {username, loading} = useContext(AppContext);

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
      {console.log("NavigationContainer username: " + username)}
      {username && username.length > 0 ? <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Hydration') {
              iconName = focused ? 'water' : 'water-outline';
            } else if (route.name === 'Log') {
              iconName = focused ? 'document-text' : 'document-text-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'list-circle' : 'list-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#002FFC',
          inactiveTintColor: 'gray',
          keyboardHidesTabBar: 'true',
        }}>
        <Tab.Screen name="Hydration" component={HydrationScreen} />
        <Tab.Screen name="Log" component={LogScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator> : <SettingsScreen />}
    </NavigationContainer>
  );
};

export default NavigationWrapper;
