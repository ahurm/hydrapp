import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DataItem = (props) => {
  return (
    <View style={styles.cardRowItem}>
      <Text style={styles.cardRowItemValue}>
        {props.value} {props.unit}
      </Text>
      <Text style={styles.cardRowItemText}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardRowItem: {
    alignItems: 'center',
    width: 100,
  },
  cardRowItemValue: {
    color: '#002FFC',
    fontSize: 22,
  },
  cardRowItemText: {
    fontSize: 14,
    marginBottom: 3,
  },
});

export default DataItem;
