import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Body, 
        Button, 
        Container, 
        Content, 
        Form, 
        Input, 
        Item, 
        Label, 
        Text} from 'native-base';

import {AppContext} from '../AppContext';
import CustomHeader from '../CustomHeader';

const SettingsScreen = () => {

  const [tempUsername, setTempUsername] = useState();
  const [tempWeight, setTempWeight] = useState();
  const [tempAge, setTempAge] = useState();

  const {username, weight, age, goal, clearSettings, changeSettings} = useContext(AppContext);

  const clearData = () => {
    setTempUsername('');
    setTempWeight('');
    setTempAge('');
    clearSettings();
  };

  const calculateGoal = (weight, age) => {
    let goal = 2.0;
    if (age >= 1 && age <= 3)
      goal = parseFloat((weight * 0.09).toFixed(2));
    else if (age >= 4 && age <= 6)
      goal = parseFloat((weight * 0.08).toFixed(2));
    else if (age >= 7 && age <= 10)
      goal = parseFloat((weight * 0.06).toFixed(2));
    else if (age >= 11 && age <= 14)
      goal = parseFloat((weight * 0.05).toFixed(2));
    else if (age >= 15 && age <= 18)
      goal = parseFloat((weight * 0.04).toFixed(2));
    else if (age >= 19)
      goal = parseFloat((weight * 0.035).toFixed(2));
    else
      goal = 2.0;

    if (goal > 3.5)
      goal = 3.5;

    return goal;
  };

  const handleSave = () => {
    const tempGoal = calculateGoal(tempWeight, tempAge);
    const values = {
      username: tempUsername,
      weight: tempWeight,
      age: tempAge,
      goal: tempGoal,
    };
    changeSettings(values);
  };

  useEffect(() => {
    setTempUsername(username);
    setTempWeight(weight);
    setTempAge(age);
  }, [username, weight, age])
  
  return (
    <Container style={styles.container}>
      <CustomHeader showButton={false} />
        <Content contentContainerStyle={styles.contentContainer}>
          <View style={styles.flexboxContainer}>
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
                  onChangeText={text => setTempWeight(text)}
                  value={tempWeight} 
                  underlineColorAndroid='#002FFC' 
                  keyboardType='decimal-pad'/>
              </Item>
              <Item stackedLabel style={styles.deleteBottomBorder}>
                <Label>Age</Label>
                <Input 
                  onChangeText={text => setTempAge(text)}
                  value={tempAge} 
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
    flexGrow: 1,
    justifyContent: 'center'
  },
  flexboxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
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
