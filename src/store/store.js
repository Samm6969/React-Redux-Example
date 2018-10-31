import { createStore as createStoreRedux } from 'redux'
import reducer from './reducer'

let store

export const getStore = () => store

export const createStore = (...args) => {
  store = createStoreRedux(reducer, ...args)
  return store
}
