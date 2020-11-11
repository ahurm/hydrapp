import React, {createContext, useState, useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "firebase";

const AppContext = createContext({
  username: '',
  weight: '',
  age: '',
  goal: 0,
  loading: true,
  hydValues: {},
  hydLogItem: {},
  changeSettings: () => null,
  setLoading: () => null,
  setHydValues: () => null,
  setHydLogItem: () => null,
});

const firebaseConfig = {
  apiKey: "AIzaSyCHvLFCB69c4ia0SHtEGWde6QjOqeUu-nc",
  authDomain: "hydrapp-264ee.firebaseapp.com",
  databaseURL: "https://hydrapp-264ee.firebaseio.com",
  projectId: "hydrapp-264ee",
  storageBucket: "hydrapp-264ee.appspot.com",
  messagingSenderId: "195295257327",
  appId: "1:195295257327:web:b3c01c4674d256026ff11a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const db = firebase.database();
const userListRef = db.ref('users');
let userKey = "";

const AppProvider = (props) => {
  const [username, setUsername] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hydLogItem, setHydLogItem] = useState({
    drink: 0,
    time: '',
    date: '',
  });
  const [hydValues, setHydValues] = useState({
    remaining: 0,
    average: 0,
    drinkCount: 0,
    balance: 0,
    status: 0,
    last: 0,
  });


  // Store settings to local storage and Firebase
  const storeSettings = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      let newUserKey = userListRef.push({
        user: value.username
      }).key;
      userKey = newUserKey;
      console.log(userKey);
    } catch (e) {
      // saving error
      console.log('storeSettings e: ' + e);
    }
  };

  // Update states and settings and empty log
  const changeSettings = useCallback((vals) => {
    // remove user and user related data from firebase

    // Update states
    setUsername(vals.username);
    setWeight(vals.weight);
    setAge(vals.age);
    setGoal(vals.goal);

    // Update hydration values
    setHydValues({
      ...hydValues,
      remaining: vals.goal - hydValues.status,
      balance: ((hydValues.status / vals.goal) * 100).toFixed(2),
    });

    // Empty log
    setHydLogItem({});

    // Write settings to local storage and firebase
    storeSettings('settings', vals);
  }, []);

  // Write hydration values to local storage and log to Firebase when new drink added
  useEffect(() => {
    // Update local storage
    const storeHydValues = async (key, value) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (e) {
        // saving error
        console.log('storeHydValues e: ' + e);
      }
    };

    // const storeHydLog = async (key, value) => {
    //   try {
    //     const jsonValue = JSON.stringify(value);
    //     await AsyncStorage.setItem(key, jsonValue);
    //   } catch (e) {
    //     // saving error
    //     console.log('storeHydLog e: ' + e);
    //   }
    // };

    // Update log to Firebase
    const storeHydLogItem = (value) => {
      try {

        const logRef = userListRef.child(userKey).child('log').push({
          drink: value.drink,
          time: value.time,
          date: value.date
        });
      } catch (e) {
        // saving error
        console.log('storeHydLogItem e: ' + e);
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
      storeHydValues('data', hydValues);
      storeHydLogItem(hydLogItem);
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

    // const getHydLog = async (key) => {
    //   try {
    //     let jsonValue = await AsyncStorage.getItem(key);
    //     jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;

    //     if (jsonValue != null) {
    //       console.log('getHydLog setHydLog');
    //       setHydLog(jsonValue);
    //       console.log(jsonValue);
    //     }
    //   } catch (e) {
    //     // error reading value
    //     console.log('getHydLog e: ' + e);
    //   }
    // };

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
        }

        getHydValues('data');
        // getHydLog('log');
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
        hydLogItem,
        changeSettings,
        setLoading,
        setHydValues,
        setHydLogItem,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};
