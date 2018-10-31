import { UPDATE_USER_SETTINGS } from './userSettingsActions'

const userSettingsReducer = (state = {}, action) => {
  const { type, settings } = action
  switch (type) {
    case UPDATE_USER_SETTINGS: {
      return settings
    }
    default:
      return state
  }
}

export default userSettingsReducer
