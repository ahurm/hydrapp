import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const LogScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Log!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
  },
});

export default LogScreen;
