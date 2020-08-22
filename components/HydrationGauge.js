import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Donut from './Donut';


const HydrationGauge = () => {
  return (
    <View style={styles.container}>
      <Donut></Donut>
      <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.hydrationText}>0.97 l</Text>
          <Text>Remaining</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EFEFEF',
    borderColor: 'red',
    borderWidth: 1
  },
  circleContainer: {
    position: 'absolute',
    alignItems: 'center',
    height: 350,
    justifyContent: 'center',
  },
  hydrationText: {
    backgroundColor: 'transparent',
    color: '#002FFC',
    fontSize: 36,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 175,
    height: 175,
    borderRadius: 175/2,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
},
});

export default HydrationGauge;