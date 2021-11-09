import * as bcd from '@mdn/browser-compat-data'
import {
  BrowserNames, CompatData, Identifier, SimpleSupportStatement, SupportBlock,
} from '@mdn/browser-compat-data/types'

export type Support = { [browser in BrowserNames]: number }
export type PropertyValues = { [value in string]: Support | undefined }
export type PropertyData = { support?: Support, values: PropertyValues }
export type Properties = { [property in string]: PropertyData }

function mapSupportStatement(support: SimpleSupportStatement): number | undefined {
  if (typeof support.version_added === 'string') {
    return Number(support.version_added.replace('≤', ''))
  }
  return undefined
}

function mapSupport(support: SupportBlock | undefined): Support | undefined {
  if (!support) return undefined
  return Object.entries(support)
    .reduce((accumulator, [browser, browserSupport]) => ({
      ...accumulator,
      [browser]: mapSupportStatement(browserSupport as SimpleSupportStatement),
    }), {} as Support)
}

function mapProperty(propertyData: Identifier): PropertyValues {
  return Object.entries(propertyData).reduce((accumulator, [value, valueData]) => {
    // eslint-disable-next-line no-underscore-dangle
    const support = (valueData as Identifier)?.__compat?.support
    if (!support) return accumulator
    return {
      ...accumulator, [value]: mapSupport(support),
    }
  }, {} as PropertyValues)
}

function mapProperties(properties: Identifier): Properties {
  return Object.entries(properties)
    .reduce((accumulator, [property, propertyData]) => ({
      ...accumulator,
      [property]: {
        // eslint-disable-next-line no-underscore-dangle
        support: mapSupport(propertyData?.__compat?.support),
        values: mapProperty(propertyData),
      },
    }), {} as Properties)
}

export type ValuesData = { [value in string]: Support }
export type Values = { [property in string]: ValuesData }
function mapValueData(data: Identifier): ValuesData {
  return Object.entries(data).reduce((accumulator, [value, valueData]) => {
    // eslint-disable-next-line no-underscore-dangle
    const support = (valueData as Identifier)?.__compat?.support
    if (!support) return accumulator
    return {
      ...accumulator, [value]: mapSupport(support),
    }
  }, {})
}

function mapValues(data: Identifier): Values {
  return Object.entries(data)
    .reduce((accumulator, [property, propertyData]) => ({
      ...accumulator,
      [property]: mapValueData(propertyData)
      ,
    }), {} as Values)
}

const { css } = bcd as CompatData
export const data = mapProperties(css.properties)
export const values = mapValues(css.types)
