import React, {createContext, useState, useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from "firebase";
import { createIconSetFromFontello } from 'react-native-vector-icons';

// Ignore timer warning
// https://github.com/facebook/react-native/issues/12981#issuecomment-652745831
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
// ----------------------------------------------------------------------------

const AppContext = createContext({
  username: '',
  weight: '',
  age: '',
  goal: 0,
  loading: true,
  hydValues: {},
  hydLogItem: {},
  hydLog: [],
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

const AppProvider = props => {
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
  const [hydLog, setHydLog] = useState([]);


  // Store firebase user key to local storage
  const storeKey = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.log('storeKey e: ' + e);
    }
  };

  /* Store user settings and firebase user key to 
  local storage and username to Firebase */
  const storeSettings = async (key, value) => {
    try {
      // Push new user to Firebase and get key
      let newUserKey = userListRef.push({
        user: value.username
      }).key;
      userKey = newUserKey;

      // Save user settings to local storage
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);

    } catch (e) {
      // saving error
      console.log('storeSettings e: ' + e);
    }
  };

  // Store new log item to Firebase
  const storeHydLogItem = value => {
    if (Object.keys(value).length !== 0 && 
        value.drink != 0 &&
        value.time != '' && 
        value.date != '') {
      const logRef = userListRef.child(userKey).child('log').push({
        drink: value.drink,
        time: value.time,
        date: value.date
      });
    }
  };

  const getHydLog = () => {
    const logRef = userListRef.child(userKey).child('log').orderByKey();
    logRef.once('value')
    .then(snapshot => {
      const logObj = snapshot.val();
      const logArr = Object.keys(logObj).map(i => logObj[i]);
      console.log("getHydLog logArr");
      console.log(logArr);
      setHydLog(logArr);
    });
  };

  // Update states and settings and empty log
  const changeSettings = useCallback( vals => {
    // remove user and user related data from firebase
    //--------

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

    // Empty log and log item states
    setHydLogItem({});
    setHydLog([]);

    // Write settings and key to local storage and firebase
    storeSettings('settings', vals);
    storeKey('key', userKey);
  }, []);



  // Write hydration values to local storage and log to Firebase when new drink added
  useEffect(() => {
    // Update local storage
    const storeHydValues = async (key, value) => {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
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
      storeHydValues('data', hydValues)
      .then(() => storeHydLogItem(hydLogItem))
      .then(() => getHydLog(userKey))
      .catch(e => console.log(e));
    }
  }, [hydValues]);

  // Get hydration values and settings from local storage when app is opened
  // Set loading false when finished.
  useEffect(() => {

    const getHydValues = async key => {
      let jsonValue = await AsyncStorage.getItem(key);
      jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (jsonValue != null) {
        setHydValues(jsonValue);
      }
    };

    const getKey = async key => {
      let jsonValue = await AsyncStorage.getItem(key);
      jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;
      console.log("getKey");
      console.log(jsonValue);

      if (jsonValue != null && jsonValue !== 0) {
        userKey = jsonValue;
      } else {
        throw new Error('No userkey stored in AsyncStorage');
      }
    };

    const getSettings = async key => {
      let jsonValue = await AsyncStorage.getItem(key);
      jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;

      // Check for username in localstorage and set if found
      if (jsonValue != null) {
        setUsername(jsonValue.username);
        setWeight(jsonValue.weight);
        setAge(jsonValue.age);
        setGoal(jsonValue.goal);
      }
    };

    const handleLoad = () => {
        getSettings('settings')
        .then(() => getKey('key'))
        .then(() => {
          console.log('THEN-BLOCK');
          if (userKey != null) getHydLog(userKey);
        })
        .then(() => getHydValues('data'))
        .catch(e => console.log("handleLoad: " + e))
        .finally(() => setLoading(false));
    };
    
    handleLoad();
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
        hydLog,
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
