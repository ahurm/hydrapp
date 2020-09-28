import React, { createContext, useState, useCallback, useEffect } from 'react';

const AppContext = createContext({
  username: "",
  changeUsername: () => null,
});

const AppProvider = props => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check for username in localstorage and set if found
    // setUsername
  }, [])

  const changeUsername = useCallback(
    (name) => {
      setUsername(name);
      // Write username to localstorage
    },
    [],
  );

  return (
    <AppContext.Provider value={{username, changeUsername}}>
      {props.children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};