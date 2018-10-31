const Validators = {
  isInteger: value => {
    const isInteger = /^-?[0-9]+$/.test(value)
    if (isInteger) return undefined
    return 'Must be an integer'
  },
  isNumeric: value => {
    const isNumeric = /^-?\d+\.?\d*$/.test(value)
    if (isNumeric) return undefined
    return 'Must be numeric'
  },
  isRequired: value => {
    const hasBeenFilled = value && value !== ''
    if (hasBeenFilled) return undefined
    return 'Required Field'
  },
}

export default Validators
