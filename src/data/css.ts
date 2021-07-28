import * as bcd from '@mdn/browser-compat-data/data.json'
import { BrowserNames, SimpleSupportStatement } from '@mdn/browser-compat-data/types'

export type Support = { [key in BrowserNames]: number }
export type PropertyValues = { [key in string]: Support | undefined }
export type PropertySupport = { support: Support | undefined, values: PropertyValues }

function mapSupport(support: any): Support | undefined {
  if (!support) return undefined
  return Object.entries(support)
    .reduce((accumulator, [browser, support]) =>
      ({ ...accumulator, [browser]: (support as SimpleSupportStatement).version_added })
      , {} as Support)
}

function mapProperty(propertyData: any): PropertyValues {
  return Object.entries(propertyData as any).reduce((accumulator, [value, valueData]) => {
    const support = (valueData as any)?.__compat?.support
    if (!support) return accumulator
    return {
      ...accumulator, [value]: mapSupport(support)
    }
  }, {} as PropertyValues)
}

function mapProperties(properties: any) {
  return Object.entries(properties)
    .reduce((accumulator, [property, propertyData]) => ({
      ...accumulator,
      [property]: { support: mapSupport((propertyData as any)?.__compat?.support), values: mapProperty(propertyData) }
    })
      , {} as { [key in string]: PropertySupport })
}

export const data = mapProperties((bcd as any).css.properties)

