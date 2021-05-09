import React, {useState} from 'react'

const AppContext = React.createContext(); 

function ContextProvider(props) {
  const [token, setToken] = useState()
  const [user, setUser] = useState()

  return (
    <AppContext.Provider value={{token, setToken, user, setUser}}>
      {props.children}
    </AppContext.Provider>
  )
}

export {ContextProvider, AppContext};