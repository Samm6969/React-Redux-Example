import { createType } from '../../schemaHelpers'

import ActionPermissionsType from './ActionPermissionsType'
import NavigationPermissionsType from './NavigationPermissionsType'
import UserPreferencesType from './UserPreferencesType'

const InvUserType = {
  name: 'InvUser',
  fields: {
    userNavigations: {
      type: NavigationPermissionsType,
    },
    userActions: {
      type: ActionPermissionsType,
    },
    userPreferences: {
      type: UserPreferencesType,
    },
  },
}

export default createType(InvUserType)
