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
  const [remainingValue, setRemainingValue] = useState(2.0);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const addHandler = (value) => {
    let tmp;
    tmp = value / 1000;
    setDebugValue(tmp);
    tmp = remainingValue - (value / 1000);
    setRemainingValue(tmp);

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
        <HydrationGauge goal={goalValue} remaining={remainingValue} />
        <Card>
          <CardItem>
            <View style={styles.cardRow}>
              <DataItem value={230} unit={'ml'} text={'Average'} />
              <DataItem value={5} text={'Drinks'} />
              <DataItem value={2.16} unit={'l'} text={'Goal'} />
            </View>
          </CardItem>
          <CardItem>
            <View style={styles.cardRow}>
              <DataItem value={55} unit={'%'} text={'Balance'} />
              <DataItem value={1.02} unit={'l'} text={'Status'} />
              <DataItem value={200} unit={'ml'} text={'Last'} />
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
