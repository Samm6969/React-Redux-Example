import { PRECISION_TYPES } from '../enums'
import { getStore } from '../store'

const abbreviations = ['', 'K', 'M', 'B', 'T']

const NUM_SIG_FIGS = 3

function getShortenedNum(num, sigFigs) {
  if (num === 0) return [num, '']
  const numDigitsToRemove = Math.floor(Math.log10(Math.abs(num)) + 1) - sigFigs
  const rounded =
    Math.round(num / 10 ** numDigitsToRemove) * 10 ** numDigitsToRemove
  const digits = Math.floor(Math.log10(Math.abs(rounded)) + 1)
  let digitsToRemove = 0
  while (digits - digitsToRemove > 3) {
    digitsToRemove += 3
  }
  return [rounded / 10 ** digitsToRemove, abbreviations[digitsToRemove / 3]]
}

export function toCurrencyString(text, currencyCode = 'USD') {
  const num = text - 0
  // TBD what we are going to do the whole file
  // const { precision, numberLocale } = getStore().getState().Settings
  const precision = PRECISION_TYPES.FULL
  const numberLocale = 'en-US'
  const baseOptions = {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  if (precision === PRECISION_TYPES.FULL)
    return num.toLocaleString(numberLocale, baseOptions)

  const [shortenedNum, abbrev] = getShortenedNum(num, NUM_SIG_FIGS)
  const sigFigOptions = {
    minimumSignificantDigits: NUM_SIG_FIGS,
    maximumSignificantDigits: NUM_SIG_FIGS,
  }
  const numWithOutAbbrev = shortenedNum.toLocaleString(numberLocale, {
    ...baseOptions,
    ...sigFigOptions,
  })
  // in european format, currencies are 1.000 $ so we need to add abbrev before space
  // in america format currencies are $1,000 so we can just add at end
  // so we search for non breaking space character, and add before if it exists otherwise add at end.
  const insertIndex = numWithOutAbbrev.indexOf(' ') // this is the nbsp; character! not space!
  return insertIndex >= 0
    ? numWithOutAbbrev.replace(' ', `${abbrev} `) // eslint-disable-line no-irregular-whitespace
    : `${numWithOutAbbrev}${abbrev}` // eslint-disable-line no-irregular-whitespace
}

export function toLocalCurrencyString(text, fromCurrency) {
  const num = text - 0
  const numUSD = num * fromCurrency.rateToUSD
  const toCurrency = getStore().getState().Settings.localCurrency
  const translatedNum = numUSD * toCurrency.rateFromUSD
  return toCurrencyString(translatedNum, toCurrency.code)
}

export function toNumberString(text) {
  const num = text - 0
  const { precision, numberLocale } = getStore().getState().Settings
  if (precision === PRECISION_TYPES.FULL) {
    return num.toLocaleString(numberLocale, {
      maximumFractionDigits: 5,
    })
  }
  const [shortenedNum, abbrev] = getShortenedNum(num, NUM_SIG_FIGS)
  const options = {
    minimumSignificantDigits: NUM_SIG_FIGS,
    maximumSignificantDigits: NUM_SIG_FIGS,
  }
  return shortenedNum.toLocaleString(numberLocale, options) + abbrev
}

export function toPercentString(text) {
  const baseOptions = {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumSignificantDigits: 5,
  }
  const { precision, numberLocale } = getStore().getState().Settings
  const options =
    precision === PRECISION_TYPES.ROUND
      ? {
          minimumSignificantDigits: NUM_SIG_FIGS,
          maximumSignificantDigits: NUM_SIG_FIGS,
        }
      : {}
  return (text - 0).toLocaleString(numberLocale, {
    ...baseOptions,
    ...options,
  })
}

export function getLongAccount({ name, client, division, tradeInstitution }) {
  const { location, institution } = tradeInstitution
  return `${location.name}.${institution.name}${
    division ? `/${division.name}` : ''
  }${client ? `/${client.name}` : ''}${name ? `/${name}` : ''}`
}
