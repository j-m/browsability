import { getPropertiesFromMultipleCSS } from "./code/css"
import { calculateMinimumSupport } from "./json/css"
import { extractRawCSS } from "./files/css"

export async function analyseCSS(fileNames: string[]): Promise<void> {
  const css = await extractRawCSS(fileNames)
  const properties = getPropertiesFromMultipleCSS(css)
  const support = calculateMinimumSupport(properties)
  console.dir(properties, { depth: null })
  console.dir(support, { depth: null })
}
