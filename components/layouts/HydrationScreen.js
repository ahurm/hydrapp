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
  const {hydLogItem, setHydLogItem} = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const addZero = (i) => {
    if (i < 10) i = "0" + i;
    return i;
  };

  const updateValues = value => {
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

    setHydValues({remaining, average, drinkCount, balance, status, last});
    
    // Update log item state
    const timestamp = new Date();
    const date = timestamp.getDate() + '.' + (timestamp.getMonth()+1) + '.' + timestamp.getFullYear();
    const minutes = addZero(timestamp.getMinutes()); 
    const hours = addZero(timestamp.getHours());
    const time = hours + ':' + minutes;

    setHydLogItem({drink: value, time: time, date: date});
  };

  const addHandler = (value) => {
    value = parseFloat(value);
    updateValues(value);
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
});

export default HydrationScreen;
