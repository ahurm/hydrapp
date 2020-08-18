/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Donut from './Donut';

<script src="http://localhost:8097"></script>

function HydrationScreen() {
  return (
    <View style={styles.container}>
      <Donut></Donut>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.hydrationText}>0.97 l</Text>
          <Text>Remaining</Text>
        </View>
      </View>
    </View>
  );
}

function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text>History!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Hydration') {
              iconName = focused ? 'water' : 'water-outline';
            } 
            else if (route.name === 'History') {
              iconName = focused ? 'pie-chart' : 'pie-chart-outline';
            }
            else if (route.name === 'Settings') {
              iconName = focused ? 'list-circle' : 'list-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#002FFC',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Hydration" component={HydrationScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EFEFEF',
  },
  circleContainer: {
    position: 'absolute',
    alignItems: 'center',
    height: 350,
    justifyContent: 'center',
  },
  hydrationText: {
    backgroundColor: 'transparent',
    color: '#002FFC',
    fontSize: 36,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 175,
    height: 175,
    borderRadius: 175/2,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    
    elevation: 4,
}
});

export default App;