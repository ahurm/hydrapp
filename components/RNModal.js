import React, {useState} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider';
import {ProgressBar} from 'native-base';

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
        <Text>Value: {sliderValue} ml</Text>
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
        <Button title="ADD" onPress={addHandler} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EFEFEF',
  },
});

export default RNModal;
