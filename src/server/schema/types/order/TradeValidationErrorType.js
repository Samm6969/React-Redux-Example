import { GraphQLString } from 'graphql'
import { createType } from '../../schemaHelpers'
import TradeValidationErrorLevelEnum from './TradeValidationErrorLevelEnum'

const TradeValidationErrorType = {
  name: 'TradeValidationErrorType',
  idFetcher: ({ errorCode }) => errorCode,
  fields: {
    errorCode: {
      type: GraphQLString,
    },
    errorLevel: {
      type: TradeValidationErrorLevelEnum,
    },
    errorMessage: {
      type: GraphQLString,
    },
  },
}

export default createType(TradeValidationErrorType)
