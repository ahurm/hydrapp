import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  CardItem,
  Container,
  Content,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import {AppContext} from '../AppContext';
import HydrationGauge from '../HydrationGauge';
import DataItem from '../DataItem';
import RNModal from '../RNModal';
import CustomHeader from '../CustomHeader';

const HydrationScreen = () => {
  const {goal, hydValues, setHydValues} = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const addHandler = (value) => {
    value = parseFloat(value);
    updateValues(value);
  };

  const handleLogging = (logItem) => {
    // Check if log exists
    // If it is then push new logitem
    // If not create new log
  }

  const updateValues = (value) => {
    const updatedValues = {
      ...hydValues,
    };
    let {remaining, average, drinkCount, balance, status, last} = updatedValues;
    last = value;
    drinkCount = drinkCount + 1;
    status = parseFloat(status) + value / 1000;
    remaining = parseFloat(remaining) - value / 1000;
    balance = (parseFloat(status) / goal) * 100;
    average = (status * 1000) / drinkCount;

    status = status.toFixed(2);
    remaining = remaining.toFixed(2);
    balance = balance.toFixed(2);
    average = average.toFixed(0);
    console.log("updateValues setHydValues");
    setHydValues({remaining, average, drinkCount, balance, status, last});
    handleLogging({status: value, timestamp: new Date()});
  };

  return (
    <Container style={styles.container}>
      <CustomHeader showButton toggleModal={toggleModal} />
      <Content>
        <RNModal visible={modalVisible} toggle={toggleModal} add={addHandler} />
        <HydrationGauge balance={hydValues.balance} remaining={hydValues.remaining} />
        <Card>
          <CardItem>
            <View style={styles.cardRow}>
              <DataItem value={hydValues.average} unit={'ml'} text={'Average'} />
              <DataItem value={hydValues.drinkCount} text={'Drinks'} />
              <DataItem value={goal} unit={'l'} text={'Goal'} />
            </View>
          </CardItem>
          <CardItem>
            <View style={styles.cardRow}>
              <DataItem value={hydValues.balance} unit={'%'} text={'Balance'} />
              <DataItem value={hydValues.status} unit={'l'} text={'Status'} />
              <DataItem value={hydValues.last} unit={'ml'} text={'Last'} />
            </View>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  headerBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default HydrationScreen;
