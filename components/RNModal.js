import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import {Button, Text} from 'native-base';

const RNModal = (props) => {
  const [sliderValue, setSliderValue] = useState(200);

  const changeValueHandler = (value) => {
    setSliderValue(value);
  };

  const addHandler = () => {
    props.add(sliderValue);
    props.toggle();
  };

  return (
    <Modal
      isVisible={props.visible}
      hideModalContentWhileAnimating={true}
      onBackdropPress={props.toggle}
      onBackButtonPress={props.toggle}>
      <View style={styles.container}>
        <Text style={styles.valueText}>Value: {sliderValue} ml</Text>
        <Slider
          style={{width: 200, height: 50}}
          minimumValue={50}
          maximumValue={1000}
          step={50}
          value={sliderValue}
          minimumTrackTintColor="#002FFC"
          maximumTrackTintColor="#000000"
          thumbTintColor="#002FFC"
          onValueChange={changeValueHandler}
        />
        <View style={styles.buttonContainer}>
          <Button rounded  onPress={addHandler}>
            <Text>Save</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
  },
  valueText : {
    marginTop: 10,
    fontSize: 18,
  },
  buttonContainer: {
    marginBottom: 10
  }
});

export default RNModal;
