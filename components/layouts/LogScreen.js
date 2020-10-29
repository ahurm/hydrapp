import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Content,
  Text,
} from 'native-base';

import {AppContext} from '../AppContext';
import CustomHeader from '../CustomHeader';

const LogScreen = () => {
  const {hydLog, setHydLog} = useContext(AppContext);
  const hydLogItems = [];
  // Check if log exists
  if (hydLog.length > 0) {
    for (let i = 0; i < hydLog.length; i++) {
      const drink = hydLog[i].drink;
      const timestamp = hydLog[i].timestamp;
      const date = timestamp.getFullYear()+'-'+(timestamp.getMonth()+1)+'-'+timestamp.getDate();
      const time = timestamp.getHours() + ":" + timestamp.getMinutes();
      const dateTime = date+' '+time;
      hydLogItems.push(<Text key={i}>Drink: {drink} Time: {dateTime}</Text>);
    }
    return (
      <Container style={styles.container}>
        <CustomHeader showButton={false} />
        <Content>
          {hydLogItems}
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
});

export default LogScreen;
