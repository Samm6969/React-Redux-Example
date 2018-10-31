import { createType } from '../../schemaHelpers'
import AftOrderResponseInput from './AftOrderRequestInput'

const AftOrderResponseType = {
  name: 'AftOrderRequest',
  fields: {
    ...AftOrderResponseInput.getFields(),
  },
}
export default createType(AftOrderResponseType)
