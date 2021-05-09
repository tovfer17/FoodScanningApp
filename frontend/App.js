import React from 'react';

import { ContextProvider } from './provider/ContextProvider.js'
import AppContainer from './screens/AppContainer';

const App = () => {

  return (
    <ContextProvider>
      <AppContainer />
    </ContextProvider>
  )
}

export default App;