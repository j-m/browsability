import * as bcd from '@mdn/browser-compat-data/data.json'
import { BrowserNames, SimpleSupportStatement } from '@mdn/browser-compat-data/types'

function mapSupportToVersion(support: any): { [key in BrowserNames]: number } {
  return Object.entries(support)
    .reduce((accumulator, [browser, support]) =>
      ({ ...accumulator, [browser]: (support as SimpleSupportStatement).version_added })
      , {} as { [key in BrowserNames]: number })
}

function mapValuesToVersion(propertyData: any): { [key in string]: { [key in BrowserNames]: number } | undefined } {
  return Object.entries(propertyData as any).reduce((accumulator, [value, valueData]) => {
    const support = (valueData as any)?.__compat?.support
    if (!support) return accumulator
    return {
      ...accumulator, [value]: support ? mapSupportToVersion(support)
        : undefined
    }
  }, {} as { [key in string]: { [key in BrowserNames]: number } | undefined })
}

function mapPropertyToVersion(properties: any) {
  return Object.entries(properties)
    .reduce((accumulator, [property, propertyData]) => ({
      ...accumulator,
      [property]: mapValuesToVersion(propertyData)
    })
      , {} as { [key in string]: { [key in string]: { [key in BrowserNames]: number } | undefined } })
}

export const data = mapPropertyToVersion((bcd as any).css.properties)

