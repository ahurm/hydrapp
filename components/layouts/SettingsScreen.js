import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Container, Content, Form, Input, Item, Label, Text} from 'native-base';

import {AppContext} from '../AppContext';
import CustomHeader from '../CustomHeader';

const SettingsScreen = () => {

  const [tempUsername, setTempUsername] = useState();
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const {username, changeUsername} = useContext(AppContext);
  const clearData = () => {
    setTempUsername('');
    changeUsername('');
    setWeight('');
    setAge('');
  };
  const handleSave = () => {
    changeUsername(tempUsername);
  };

  useEffect(() => {
    setTempUsername(username);
  }, [username])
  

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
              onChangeText={text => setTempUsername(text)}
              value={tempUsername} 
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
          <Button rounded onPress={handleSave}>
            <Text>Save</Text>
          </Button>
          <Button rounded onPress={clearData}>
            <Text>Clear</Text>
          </Button>
        </View>
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
