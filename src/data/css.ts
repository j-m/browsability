import * as bcd from '@mdn/browser-compat-data/data.json'
import { BrowserNames, SimpleSupportStatement } from '@mdn/browser-compat-data/types'

export const data =
  Object.entries((bcd as any).css.properties)
    .reduce((accumulator, [key, value]) => ({
      ...accumulator,
      [key]: (value as any).__compat?.support ?
        Object.entries((value as any).__compat.support)
          .reduce((accumulator, [key, value]) =>
            ({ ...accumulator, [key]: (value as SimpleSupportStatement).version_added })
            , {} as { [key in BrowserNames]: number })
        : undefined
    })
      , {} as { [key in string]: { [key in BrowserNames]: number } | undefined })
