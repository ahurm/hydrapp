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
import { Body, Button, Card, CardItem, Container,Content, Header, Left, Right, Text, Title } from 'native-base';
import HydrationGauge from './components/HydrationGauge';
import DataItem from './components/DataItem';
import RNModal from './components/RNModal';

<script src="http://localhost:8097"></script>

function HydrationScreen() {

  const [isModalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (

    <Container style={styles.container}>
      <Header>
        <Body style={styles.headerBody}>
          <Title style={{paddingLeft: 25}}>Hydrapp</Title>
          <Right>
            <Button onPress={toggleModal}>
              <Text>ADD</Text>
            </Button>
          </Right>
        </Body>
      </Header>
      <Content>
        <RNModal visible={isModalVisible} toggle={toggleModal} />
        <HydrationGauge />
        <Card>
          <CardItem>
            <View style={styles.cardRow}>
              <DataItem value={'230 ml'} text={'Average'} />
              <DataItem value={'5'} text={'Drinks'} />
              <DataItem value={'2.16 l'} text={'Goal'} />
            </View>
          </CardItem>
          <CardItem>
            <View style={styles.cardRow}>
              <DataItem value={'55%'} text={'Balance'} />
              <DataItem value={'1.02 l'} text={'Status'} />
              <DataItem value={'200 ml'} text={'Last'} />
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
  headerBody: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row'
  }
});

export default App;