import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content, Text} from 'native-base';

import CustomHeader from '../CustomHeader';

const SettingsScreen = () => {
  return (
    <Container style={styles.container}>
      <CustomHeader showButton={false} />
      <Content contentContainerStyle={styles.contentContainer}>
        <Text>This is Content Section</Text>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SettingsScreen;
