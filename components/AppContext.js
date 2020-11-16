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
let lastDate = "";

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
    console.log("storeKey IN");
    
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.log('storeKey e: ' + e);
    }

    console.log("storeKey OUT");
  };

  /* Store user settings and firebase user key to 
  local storage and username to Firebase */
  const storeSettings = async (key, value) => {
    console.log("storeSettings IN");
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
    console.log("storeSettings OUT");
  };

  // Store new log item to Firebase
  const storeHydLogItem = value => {
    console.log("storeHydLogItem IN");
    if (!(typeof value === 'object' && value !== null)) return;
    if (Object.keys(value).length !== 0 && 
        value.drink !== 0 &&
        value.time !== '' && 
        value.date !== '') {
      const logRef = userListRef.child(userKey).child('log').push({
        drink: value.drink,
        time: value.time,
        date: value.date
      });
    }
    console.log("storeHydLogItem OUT");
  };

  const getHydLog = async () => {
    if (userKey === null) return;
    console.log("getHydLog IN");
    const logRef = userListRef.child(userKey).child('log').orderByKey();
    const snapshot = await logRef.once('value');
    const logObj = snapshot.val();

    if (!(typeof logObj === 'object' && logObj !== null)) {
      console.log("getHydLog OUT");
      return;
    } 

    const tempLogArr = Object.keys(logObj).map(i => logObj[i]);
    const logArr = tempLogArr.reverse().slice(0, 20);
    setHydLog(logArr);
    lastDate = logArr[0].date;
    console.log("getHydLog OUT");
  };

  const changeSession = () => {
    console.log("changeSession IN");
    console.log(lastDate);
    if (lastDate !== "") {
      const now = new Date();
      const logDate = lastDate.split(".");
      if (logDate[2] === now.getFullYear().toString())
        if (logDate[1] === (now.getMonth() + 1).toString())
          if(logDate[0] === now.getDate().toString()) {
            console.log("changeSession OUT: FALSE");
            return false;
          }

      console.log("changeSession OUT: TRUE");
      return true;
    }
    console.log("changeSession OUT: FALSE");
    return false;
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
      console.log("storeHydValues IN");
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log("storeHydValues OUT");
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
      console.log("getHydValues IN");

      if((changeSession())) {
        setHydValues({
          remaining: goal,
          average: 0,
          drinkCount: 0,
          balance: 0,
          status: 0,
          last: 0,
        });
        console.log("getHydValues OUT: SESSION CHANGED");
        return;
      }

      let jsonValue = await AsyncStorage.getItem(key);
      jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (jsonValue !== null) {
        setHydValues(jsonValue);
      }

      console.log("getHydValues OUT");
    };

    const getKey = async key => {
      console.log("getKey IN");
      let jsonValue = await AsyncStorage.getItem(key);
      jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;
      

      if (jsonValue !== null && jsonValue !== 0) {
        userKey = jsonValue;
      } else {
        throw new Error('No userkey stored in AsyncStorage');
      }
      console.log("getKey OUT");
    };

    const getSettings = async key => {
      console.log("getSettings IN");
      let jsonValue = await AsyncStorage.getItem(key);
      jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;

      // Check for username in localstorage and set if found
      if (jsonValue !== null) {
        setUsername(jsonValue.username);
        setWeight(jsonValue.weight);
        setAge(jsonValue.age);
        setGoal(jsonValue.goal);
      }
      console.log("getSettings OUT");
    };

    const handleLoad = () => {
      let change = false;
      console.log("handleLoad IN");
        getSettings('settings')
        .then(() => getKey('key'))
        .then(() => getHydLog(userKey))
        .then(() => getHydValues('data'))
        .catch(e => console.log("handleLoad: " + e))
        .finally(() => {
          console.log("handleLoad OUT");
          setLoading(false);
        }) 
      
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
