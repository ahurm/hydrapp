import React, {useState} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

const RNModal = (props) => {
  return (
    <Modal 
      isVisible={props.visible} 
      hideModalContentWhileAnimating={true} 
      onBackdropPress={props.toggle}
      onBackButtonPress={props.toggle}>
      <View style={styles.container}>
        <Text>Hello!</Text>
        <Button title="Hide modal" onPress={props.toggle} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#EFEFEF',
  },
});

export default RNModal;