import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Content,
  Text,
} from 'native-base';

import CustomHeader from '../CustomHeader';

const LogScreen = () => {

  // Check if log exists
  // If not then render "Log not found."
  return (
    <Container style={styles.container}>
      <CustomHeader showButton={false} />
      <Content>
        <Text>HALLO</Text>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
  },
});

export default LogScreen;
