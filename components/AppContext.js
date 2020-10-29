import React, {createContext, useState, useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AppContext = createContext({
  username: '',
  weight: '',
  age: '',
  goal: 0,
  loading: true,
  hydValues: {},
  hydLog: [],
  changeSettings: () => null,
  setLoading: () => null,
  setHydValues: () => null,
  setHydLog: () => null,
});

const AppProvider = (props) => {
  const [username, setUsername] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hydValues, setHydValues] = useState({
    remaining: 0,
    average: 0,
    drinkCount: 0,
    balance: 0,
    status: 0,
    last: 0,
  });
  const [hydLog, setHydLog] = useState([]);


  const storeSettings = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.log('storeSettings e: ' + e);
    }
  };

  const changeSettings = useCallback((vals) => {
    setUsername(vals.username);
    setWeight(vals.weight);
    setAge(vals.age);
    setGoal(vals.goal);
    console.log('changeSettings hydValues');
    console.log(hydValues);

    // Update hydration values when settings changed
    setHydValues({
      ...hydValues,
      remaining: vals.goal - hydValues.status,
      balance: ((hydValues.status / vals.goal) * 100).toFixed(2),
    });

    // Empty log
    setHydLog([]);

    // Write settings to local storage
    storeSettings('settings', vals);
  }, []);

  // Write hydration values to local storage when values changed
  useEffect(() => {
    const storeHydValues = async (key, value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (e) {
        // saving error
        console.log('storeHydValues e: ' + e);
      }
    };

    const storeHydLog = async (key, value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (e) {
        // saving error
        console.log('storeHydLog e: ' + e);
      }
    };

    // Check if hydration values object has empty values
    let empty = true;
    for (const key in hydValues) {
      if (hydValues.hasOwnProperty(key)) {
        const element = hydValues[key];
        if (element != 0) empty = false;
      }
    }

    // Preventing to overwrite stored values with empty values
    if (!empty) {
      console.log('useEffect storeHydValues hydValues');
      console.log(hydValues);
      storeHydValues('data', hydValues);
      storeHydLog('log', hydLog);
    }
  }, [hydValues]);

  // Get hydration values and settings from local storage when app is opened
  // Set loading false when finished.
  useEffect(() => {
    const getHydValues = async (key) => {
      try {
        let jsonValue = await AsyncStorage.getItem(key);
        jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (jsonValue != null) {
          console.log('getHydValues setHydValues');
          setHydValues(jsonValue);
          console.log(jsonValue);
        }
      } catch (e) {
        // error reading value
        console.log('getHydValues e: ' + e);
      }
    };

    const getHydLog = async (key) => {
      try {
        let jsonValue = await AsyncStorage.getItem(key);
        jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (jsonValue != null) {
          console.log('getHydLog setHydLog');
          setHydLog(jsonValue);
          console.log(jsonValue);
        }
      } catch (e) {
        // error reading value
        console.log('getHydLog e: ' + e);
      }
    };

    const getSettings = async (key) => {
      try {
        let jsonValue = await AsyncStorage.getItem(key);
        jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;

        // Check for username in localstorage and set if found
        if (jsonValue != null) {
          console.log('Settaukset');
          setUsername(jsonValue.username);
          setWeight(jsonValue.weight);
          setAge(jsonValue.age);
          setGoal(jsonValue.goal);
          console.log('getSettings jsonValue.username: ' + jsonValue.username);
          console.log('getSettings jsonValue.weight: ' + jsonValue.weight);
          console.log('getSettings jsonValue.age: ' + jsonValue.age);
          console.log('getSettings jsonValue.goal: ' + jsonValue.goal);
        }

        getHydValues('data');
        getHydLog('log');
      } catch (e) {
        // error reading value
        console.log('getSettings e: ' + e);
      } finally {
        setLoading(false);
      }
    };
    getSettings('settings');
  }, []);

  return (
    <AppContext.Provider
      value={{
        username,
        weight,
        age,
        goal,
        loading,
        hydValues,
        hydLog,
        changeSettings,
        setLoading,
        setHydValues,
        setHydLog,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};
