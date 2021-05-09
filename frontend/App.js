import React from 'react';

import { TokenProvider } from './provider/TokenProvider.js'
import AppContainer from './screens/AppContainer';

const App = () => {

  return (
    <TokenProvider>
      <AppContainer />
    </TokenProvider>
  )
}

export default App;