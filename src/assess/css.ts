import { getPropertiesFromMultipleCSS } from './code/css'
import { calculateMinimumSupport } from './json/css'
import { extractRawCSS } from './files/css'

export default async function analyseCSS(fileNames: string[]): Promise<void> {
  const css = await extractRawCSS(fileNames)
  const properties = getPropertiesFromMultipleCSS(css)
  const support = calculateMinimumSupport(properties)
  // TODO I/O output/logging
  // eslint-disable-next-line no-console
  console.dir(properties, { depth: null })
  // TODO I/O output/logging
  // eslint-disable-next-line no-console
  console.dir(support, { depth: null })
}
