import React, {useState} from 'react'

const TokenContext = React.createContext(); 

function TokenProvider(props) {
  const [token, setToken] = useState()

  return (
    <TokenContext.Provider value={{token,setToken}}>
      {props.children}
    </TokenContext.Provider>
  )
}

export {TokenProvider, TokenContext};