import _ from 'lodash'

export const isUndefinedNull = value => _.isUndefined(value) || _.isNull(value)

export const isUndefinedNullEmpty = value =>
  isUndefinedNull(value) || _.isEmpty(value)
