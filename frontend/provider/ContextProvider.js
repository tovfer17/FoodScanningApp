import React, {useState} from 'react'
import Constants from 'expo-constants'
const { manifest } = Constants;

const AppContext = React.createContext(); 

function ContextProvider(props) {
  const [token, setToken] = useState()
  const [user, setUser] = useState()
  const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
   ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
   : `localhost:3000`;
  
  return (
    <AppContext.Provider value={{token, setToken, user, setUser, api }}>
      {props.children}
    </AppContext.Provider>
  )
}

export {ContextProvider, AppContext};