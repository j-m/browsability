import { BrowserNames } from '@mdn/browser-compat-data/types'

import { Support, data } from '../../data/css'

export interface Position {
  line: number;
  column: number;
}

export type PropertyValueOccurrence = { [key in string]: { [key in string]: Position[] } }

function maximum(supportA: Support, supportB: Support): Support {
  return Object.entries(supportA).reduce((accumulator, [browser, version]) => ({
    ...accumulator, [browser]: (supportB[browser as BrowserNames] > version) ? supportB[browser as BrowserNames] : version,
  }), {} as Support)
}

const ZERO_SUPPORT: Support = {
  chrome: 0,
  chrome_android: 0,
  edge: 0,
  firefox: 0,
  firefox_android: 0,
  ie: 0,
  nodejs: 0,
  opera: 0,
  opera_android: 0,
  safari: 0,
  safari_ios: 0,
  samsunginternet_android: 0,
  webview_android: 0,
}

export function calculateMinimumSupport(properties: PropertyValueOccurrence): Support {
  let minimumSupport: Support = { ...ZERO_SUPPORT }
  Object.entries(properties).forEach(([property, values]) => {
    if (!data[property]) return
    const propertySupport = data[property].support
    if (!propertySupport) return
    minimumSupport = maximum(minimumSupport, propertySupport)
    Object.keys(values).forEach((value) => {
      const support = data[property].values[value]
      if (!support) return
      minimumSupport = maximum(minimumSupport, support)
    })
  })
  return minimumSupport
}
