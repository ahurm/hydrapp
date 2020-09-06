import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Content,
  Text,
} from 'native-base';

import CustomHeader from '../CustomHeader';

const LogScreen = () => {
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
