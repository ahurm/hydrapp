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
  clearSettings: () => null,
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
  // States
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

  // Store firebase key to local storage
  const storeKey = async (key, value) => {    
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
      console.log('storeKey e: ' + e);
    }    
  };

  // Store user settings to local storage
  const storeSettings = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);

    } catch (e) {
      // saving error
      console.log('storeSettings e: ' + e);
    }
  };

  // Create new user and key or update username to Fireabase
  const handleUsername = async (name, prevName) => {
    try {
      // Push new user to Firebase and get key
      if (name !== null && prevName.length === 0) {
        let newUserKey = userListRef.push({
          user: name
        }).key;
        userKey = newUserKey;  
      } 
      // Update username to Firebase
      else if (name !== null && prevName.length !== 0) {
        let userRef = userListRef.child(userKey).update({
          user: name
        });
      }
    } catch (e) {
      // saving error
      console.log('handleUsername e: ' + e);
    }
  };

  // Store new log item to Firebase
  const storeHydLogItem = value => {
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
  };

  // Get log from Firebase
  const getHydLog = async () => {
    if (userKey === null) return;

    const logRef = userListRef.child(userKey).child('log').orderByKey();
    const snapshot = await logRef.once('value');
    const logObj = snapshot.val();

    if (!(typeof logObj === 'object' && logObj !== null)) return;

    const tempLogArr = Object.keys(logObj).map(i => logObj[i]);
    const logArr = tempLogArr.reverse().slice(0, 20);
    setHydLog(logArr);
    lastDate = logArr[0].date;
  };

  // Check if day (session) is changed
  const changeSession = () => {
    if (lastDate !== "") {
      const now = new Date();
      const logDate = lastDate.split(".");
      if (logDate[2] === now.getFullYear().toString())
        if (logDate[1] === (now.getMonth() + 1).toString())
          if(logDate[0] === now.getDate().toString()) 
            return false;

      return true;
    }
    return false;
  };

  // Update states and settings and empty log
  const changeSettings = useCallback( vals => {
    const prevUsername = username;

    setUsername(vals.username);
    setWeight(vals.weight);
    setAge(vals.age);
    setGoal(vals.goal);

    setHydValues( prevValues => ({
      ...prevValues,
      remaining: vals.goal - prevValues.status,
      balance: ((prevValues.status / vals.goal) * 100).toFixed(2),
    }));

    setHydLogItem({});
    setHydLog([]);

    // Write settings and key to local storage and firebase
    handleUsername(vals.username, prevUsername);
    storeSettings('settings', vals);
    storeKey('key', userKey);
  }, [username]);

  // Remove user from Firebase and reset state and local storage
  const clearSettings = useCallback( () => {
    deleteFirebaseData();

    setUsername('');
    setWeight('');
    setAge('');
    setGoal(0);

    setHydValues({
      remaining: 0,
      average: 0,
      drinkCount: 0,
      balance: 0,
      status: 0,
      last: 0,
    });

    setHydLogItem({});
    setHydLog([]);

    storeSettings('settings', null);
    storeKey('key', '');
  });

  const deleteFirebaseData = async () => {
    if (userKey === null) return; 
    
    const userRef = userListRef.child(userKey);
    userRef.remove()
    .catch(e => {
      console.log("deleteFirebaseData e: " + e)
    });
  };

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

  /* Get hydration values and settings from local storage when app is opened. 
  Set loading to false when finished. */
  useEffect(() => {

    // Get hydration values from local storage
    const getHydValues = async key => {

      // Reset values if day (sessio) has been changed
      if((changeSession())) {
        setHydValues({
          remaining: goal,
          average: 0,
          drinkCount: 0,
          balance: 0,
          status: 0,
          last: 0,
        });
        return;
      }

      let jsonValue = await AsyncStorage.getItem(key);
      jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;

      if (jsonValue !== null) setHydValues(jsonValue);
    };

    // Get key from local storage
    const getKey = async key => {
      let jsonValue = await AsyncStorage.getItem(key);
      jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;
    
      if (jsonValue !== null && jsonValue !== 0) {
        userKey = jsonValue;
      } else {
        throw new Error('No userkey stored in AsyncStorage');
      }
    };

    // Get settings from local storage
    const getSettings = async key => {
      let jsonValue = await AsyncStorage.getItem(key);
      jsonValue = jsonValue != null ? JSON.parse(jsonValue) : null;

      // Check for username in localstorage and set if found
      if (jsonValue !== null) {
        setUsername(jsonValue.username);
        setWeight(jsonValue.weight);
        setAge(jsonValue.age);
        setGoal(jsonValue.goal);
      }
    };

    // This is executed when the application is opened
    const handleLoad = () => {
      let change = false;
        getSettings('settings')
        .then(() => getKey('key'))
        .then(() => getHydLog(userKey))
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
        clearSettings,
        setLoading,
        setHydValues,
        setHydLogItem,
      }}>
      {props.children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};
