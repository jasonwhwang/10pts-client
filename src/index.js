import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './box.css'
import App from './views/App'
import * as serviceWorker from './serviceWorker'

import ReactGA from 'react-ga'
import Amplify from 'aws-amplify'
import AuthStore from './services/authStore'

import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './reducers/store'
import { PersistGate } from 'redux-persist/integration/react'
export const { store, persistor } = configureStore()

// Google Analytics
if (!process.env.REACT_APP_var_STAGE === 'dev') ReactGA.initialize(process.env.REACT_APP_ga_ID)

// AWS Amplify Config
Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_c_REGION,
    userPoolId: process.env.REACT_APP_c_USER_POOL_ID,
    identityPoolId: process.env.REACT_APP_c_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_c_APP_CLIENT_ID,
    storage: AuthStore,
    oauth: {
      domain: process.env.REACT_APP_c_APP_DOMAIN,
      scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
      redirectSignIn: process.env.REACT_APP_var_STAGE === 'dev' ? 'http://localhost:3000/callback' : `${process.env.REACT_APP_url_LINK}/callback`,
      redirectSignOut: process.env.REACT_APP_var_STAGE === 'dev' ? 'http://localhost:3000' : process.env.REACT_APP_url_LINK,
      responseType: 'code'
    }
  },
  Storage: {
    region: process.env.REACT_APP_s3_REGION,
    level: 'public',
    bucket: process.env.REACT_APP_s3_BUCKET,
    identityPoolId: process.env.REACT_APP_c_IDENTITY_POOL_ID
  }
})

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
