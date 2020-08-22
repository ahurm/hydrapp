/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Body, Card, CardItem, Container,Content, Header, Left, Right, Text, Title } from 'native-base';
import HydrationGauge from './components/HydrationGauge';

<script src="http://localhost:8097"></script>

function HydrationScreen() {
  return (
    <Container style={styles.container}>
      <Header>
        <Body>
          <Title style={{paddingLeft: 25,}}>Hydrapp</Title>
        </Body>
      </Header>
      <Content>
        <HydrationGauge />
        <Card>
          <CardItem>
            <View style={styles.cardRow}>
              <View style={styles.cardRowItem}>
                <Text>5</Text>
                <Text>Drinks</Text>
              </View>
              <View style={styles.cardRowItem}>
                <Text>5</Text>
                <Text>Drinks</Text>
              </View>
              <View style={styles.cardRowItem}>
                <Text>5</Text>
                <Text>Drinks</Text>
              </View>
            </View>
          </CardItem>
        </Card>
      </Content>
    </Container>

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
    backgroundColor: '#EFEFEF',
  },
  cardRow: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-around'
  },
  cardRowItem: {
    alignItems: 'center'
  }
});

export default App;