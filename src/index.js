import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './box.css'
import App from './views/App'
import * as serviceWorker from './serviceWorker'

import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './reducers/store'
import { PersistGate } from 'redux-persist/integration/react'
export const { store, persistor } = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
document.getElementById('root'))

serviceWorker.register()
