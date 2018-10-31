import { GraphQLBoolean } from 'graphql'

import { createType } from '../../schemaHelpers'

const UserPreferencesType = {
  name: 'UserPreferences',
  fields: {
    defaultTransparencyChartDecimal: {
      type: GraphQLBoolean,
    },
    defaultTransparencyChartPrintSelection: {
      type: GraphQLBoolean,
    },
  },
}

export default createType(UserPreferencesType)
