import * as bcd from '@mdn/browser-compat-data/data.json'
import {
  BrowserNames, CompatDataIdentifiers, Identifier, SimpleSupportStatement,
} from '@mdn/browser-compat-data/types'

export type Support = { [key in BrowserNames]: number }
export type PropertyValues = { [key in string]: Support | undefined }
export type Property = { support: Support | undefined, values: PropertyValues }

function mapSupportStatement(support: SimpleSupportStatement): number | undefined {
  if (typeof support.version_added === 'string') {
    return Number(support.version_added.replace('≤', ''))
  }
  return undefined
}

function mapSupport(support: Record<string, unknown> | undefined): Support | undefined {
  if (!support) return undefined
  return Object.entries(support)
    .reduce((accumulator, [browser, browserSupport]) => ({
      ...accumulator,
      [browser]: mapSupportStatement(browserSupport as SimpleSupportStatement),
    }), {} as Support)
}

function mapProperty(propertyData: Record<string, unknown>): PropertyValues {
  return Object.entries(propertyData).reduce((accumulator, [value, valueData]) => {
    // eslint-disable-next-line no-underscore-dangle
    const support = (valueData as Identifier)?.__compat?.support
    if (!support) return accumulator
    return {
      ...accumulator, [value]: mapSupport(support),
    }
  }, {} as PropertyValues)
}

function mapProperties(properties: Record<string, unknown>) {
  return Object.entries(properties)
    .reduce((accumulator, [property, propertyData]) => ({
      ...accumulator,
      [property]: {
        // eslint-disable-next-line no-underscore-dangle
        support: mapSupport((propertyData as Identifier)?.__compat?.support),
        values: mapProperty(propertyData as Identifier),
      },
    }), {} as { [key in string]: Property })
}

export const data = mapProperties((bcd as CompatDataIdentifiers).css.properties)
