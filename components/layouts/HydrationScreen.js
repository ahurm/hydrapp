import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Right,
  Text,
  Title,
} from 'native-base';

import HydrationGauge from '../HydrationGauge';
import DataItem from '../DataItem';
import RNModal from '../RNModal';

const HydrationScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [debugValue, setDebugValue] = useState(0);
  const [goalValue, setGoalValue] = useState(2.0);
  const [values, setValues] = useState({
    remaining: 2.0,
    average: 0,
    drinkCount: 0,
    balance: 0,
    status: 0,
    last: 0,
  });
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const addHandler = (value) => {
    value = parseFloat(value);
    updateValues(value);
  };

  const updateValues = (value) => {
    const updatedValues = {
      ...values,
    };
    let {remaining, average, drinkCount, balance, status, last} = updatedValues;

    last = value;
    drinkCount = drinkCount + 1;
    status = parseFloat(status) + value / 1000;
    remaining = parseFloat(remaining) - value / 1000;
    balance = (parseFloat(status) / goalValue) * 100;
    average = (status * 1000) / drinkCount;

    status = status.toFixed(2);
    remaining = remaining.toFixed(2);
    balance = balance.toFixed(2);
    average = average.toFixed(0);

    setValues({remaining, average, drinkCount, balance, status, last});
  };

  return (
    <Container style={styles.container}>
      <Header>
        <Body style={styles.headerBody}>
          <Title style={{paddingLeft: 25}}>Hydrapp {debugValue}</Title>
          <Right>
            <Button onPress={toggleModal}>
              <Text>ADD</Text>
            </Button>
          </Right>
        </Body>
      </Header>
      <Content>
        <RNModal visible={modalVisible} toggle={toggleModal} add={addHandler} />
        <HydrationGauge balance={values.balance} remaining={values.remaining} />
        <Card>
          <CardItem>
            <View style={styles.cardRow}>
              <DataItem value={values.average} unit={'ml'} text={'Average'} />
              <DataItem value={values.drinkCount} text={'Drinks'} />
              <DataItem value={goalValue} unit={'l'} text={'Goal'} />
            </View>
          </CardItem>
          <CardItem>
            <View style={styles.cardRow}>
              <DataItem value={values.balance} unit={'%'} text={'Balance'} />
              <DataItem value={values.status} unit={'l'} text={'Status'} />
              <DataItem value={values.last} unit={'ml'} text={'Last'} />
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
