import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Card,
  CardItem,
  Body,
  Container,
  Content,
  List,
  ListItem,
  Text,
} from 'native-base';

import {AppContext} from '../AppContext';
import CustomHeader from '../CustomHeader';
import DataItem from '../DataItem';

const LogScreen = () => {
  const {hydLog, setHydLog} = useContext(AppContext);
  const hydLogItems = [];
  const addZero = (i) => {
    if (i < 10) i = "0" + i;
    return i;
  };

  // Check if log exists
  if (hydLog.length > 0) {
    for (let i = 0; i < hydLog.length; i++) {
      const drink = hydLog[i].drink;
      const timestamp = hydLog[i].timestamp;
      const date = timestamp.getDate() + '.' + (timestamp.getMonth()+1) + '.' + timestamp.getFullYear();
      const minutes = addZero(timestamp.getMinutes()); 
      const hours = addZero(timestamp.getHours());
      const time = hours + ':' + minutes;
      
      hydLogItems.push(
        <ListItem noIndent key={i} style={styles.listItem}>
          <View style={styles.listItemRow}>
            <DataItem value={drink} unit={'ml'} text={'Amount'} />
            <DataItem value={time} text={date} />
          </View>
        </ListItem>
      );
    }
    return (
      <Container style={styles.container}>
        <CustomHeader showButton={false} />
        <Content>
          <List>
            {hydLogItems.reverse()}
          </List>
        </Content>
      </Container>
    );
  } else {
    // If not then render "Log not found."
    return (
      <Container style={styles.container}>
        <CustomHeader showButton={false} />
        <Content>
          <Text>Log not found.</Text>
        </Content>
      </Container>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
  },
  listItemRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  listItem: {
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
  }
});

export default LogScreen;
