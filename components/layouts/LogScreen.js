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
  const {hydLog} = useContext(AppContext);
  const hydLogItems = [];

  // Check if log exists
  if (hydLog.length > 0) {
    hydLog.map((el, i) => {
      const drink = el.drink;
      const date = el.date;
      const time = el.time;

      hydLogItems.push(
        <ListItem noIndent key={i} style={styles.listItem}>
          <View style={styles.listItemRow}>
            <DataItem value={drink} unit={'ml'} text={'Amount'} />
            <DataItem value={time} text={date} />
          </View>
        </ListItem>
      );
    });
    return (
      <Container style={styles.container}>
        <CustomHeader showButton={false} />
        <Content>
          <List>
            {hydLogItems}
          </List>
        </Content>
      </Container>
    );
  } else {
    // If not then render "Log not found."
    return (
      <Container style={styles.container}>
        <CustomHeader showButton={false} />
        <Content contentContainerStyle={styles.contentContainer}>
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
  contentContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
