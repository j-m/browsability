import { BrowserNames } from '@mdn/browser-compat-data/types'

import { Support, data } from '../../data/css'

export interface Position {
  line: number;
  column: number;
}

export type Occurrence = { positions: Position[], support?: Support }
export type PropertyValueData = { [value in string]: Occurrence }
export type PropertyData = { [property in string]: { values: PropertyValueData, support?: Support } }

function maximum(supportA: Support, supportB?: Support): Support {
  if (!supportB) return supportA
  return Object.entries(supportA).reduce((accumulator, [browser, version]) => ({
    ...accumulator,
    [browser]: (supportB[browser as BrowserNames] > version)
      ? supportB[browser as BrowserNames]
      : version,
  }), {} as Support)
}

export const ZERO_SUPPORT: Support = {
  chrome_android: 0,
  chrome: 0,
  deno: 0,
  edge: 0,
  firefox_android: 0,
  firefox: 0,
  ie: 0,
  nodejs: 0,
  opera_android: 0,
  opera: 0,
  safari_ios: 0,
  safari: 0,
  samsunginternet_android: 0,
  webview_android: 0,
}

export function calculateMinimumSupport(properties: PropertyData): Support {
  let minimumSupport: Support = { ...ZERO_SUPPORT }
  Object.keys(properties).forEach((property) => {
    minimumSupport = maximum(minimumSupport, properties[property].support)
    Object.keys(properties[property].values).forEach((value) => {
      minimumSupport = maximum(minimumSupport, properties[property].values[value].support)
    })
  })
  return minimumSupport
}

export function addSupportDataToPropertyValueOccurrence(properties: PropertyData): PropertyData {
  const propertiesWithSupport = { ...properties }
  Object.keys(properties).forEach((property) => {
    if (!data[property]) return
    propertiesWithSupport[property].support = data[property].support
    Object.keys(propertiesWithSupport[property].values).forEach((value) => {
      propertiesWithSupport[property].values[value].support = data[property].values[value]
    })
  })

  return propertiesWithSupport
}
