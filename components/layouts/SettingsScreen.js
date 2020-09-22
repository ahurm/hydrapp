import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Container, Content, Form, Input, Item, Label, Text} from 'native-base';

import CustomHeader from '../CustomHeader';

const SettingsScreen = () => {

  const [username, setUsername] = useState();
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();

  const clearData = () => {
    setUsername('');
    setWeight('');
    setAge('');
  };

  return (
    <Container style={styles.container}>
      <CustomHeader showButton={false} />
      <Content contentContainerStyle={styles.contentContainer}>
        <View style={styles.infoTextContainer}>
          <Text>
            Submit your username, weight in kilograms and age to 
            calculate your daily water intake needs.
          </Text>
        </View>
        <Form style={styles.formContainer}>
          <Item stackedLabel style={styles.deleteBottomBorder}>
            <Label>Username</Label>
            <Input 
              onChangeText={text => setUsername(text)}
              value={username} 
              underlineColorAndroid='#002FFC' />
          </Item>
          <Item stackedLabel style={styles.deleteBottomBorder}>
            <Label>Weight (kg)</Label>
            <Input 
              onChangeText={text => setWeight(text)}
              value={weight} 
              underlineColorAndroid='#002FFC' 
              keyboardType='decimal-pad'/>
          </Item>
          <Item stackedLabel style={styles.deleteBottomBorder}>
            <Label>Age</Label>
            <Input 
              onChangeText={text => setAge(text)}
              value={age} 
              underlineColorAndroid='#002FFC' 
              keyboardType='decimal-pad'/>
          </Item>
        </Form>
        <View style={styles.buttonContainer}>
          <Button rounded >
            <Text>Save</Text>
          </Button>
          <Button rounded onPress={clearData}>
            <Text>Clear</Text>
          </Button>
        </View>
        <Text>{username}</Text>
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
  formContainer: {
    width: 200,
  },
  buttonContainer: {
    width: 200,
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  deleteBottomBorder: {
   borderBottomWidth: 0,
  },
  infoTextContainer: {
    width: 350,
    marginBottom: 30,
  },
});

export default SettingsScreen;
