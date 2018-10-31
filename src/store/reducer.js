import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {
  drawerReducer as drawers,
  networkErrorsReducer as NetworkErrors,
  networkSuccessReducer as NetworkSuccess,
} from '@fc/react-playbook'
import tableOfContentsReducer from '../components/TableOfContents/tableOfContentsReducer'
import userSettingsReducer from '../containers/UserSettings/userSettingsReducer'

export default combineReducers({
  drawers,
  NetworkErrors,
  NetworkSuccess,
  session: (state = {}) => state,
  user: (state = {}) => state,
  environment: (state = {}) => state,
  exchangeId: (state = {}) => state,
  tableOfContents: tableOfContentsReducer,
  settings: userSettingsReducer,
  form: formReducer,
})
