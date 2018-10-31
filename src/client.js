import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { LicenseManager } from 'ag-grid-enterprise'

// import '@fc/react-playbook/src/utils/fetch'
import App from './containers/App'
import { createStore } from './store'

const rootEl = document.getElementById('react-container')

LicenseManager.setLicenseKey(
  'Evaluation_License_Not_For_Production_Valid_Until29_December_2018__MTU0NjA0MTYwMDAwMA==da4235ce6b5f52a047141c95928d9455',
)

// Grab the state from a global variable injected into the server-generated HTML
// eslint-disable-next-line no-underscore-dangle
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
// eslint-disable-next-line no-underscore-dangle
delete window.__PRELOADED_STATE__

const store = createStore(
  preloadedState,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const render = Component => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <Router basename={process.env.BASENAME}>
        <Component />
      </Router>
    </Provider>,
    rootEl,
  )
}

render(App)
