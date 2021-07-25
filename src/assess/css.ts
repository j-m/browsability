import { readFile } from 'fs/promises'

import { parse, Declaration, Rule } from 'css'
import { BrowserNames } from '@mdn/browser-compat-data/types'
import { data } from '../data/css'

export function getPropertiesFromCSS(css: string): string[] {
  const properties = []

  const cssObj = parse(css)
  if (!cssObj || !cssObj.stylesheet) return []
  const rules = cssObj.stylesheet.rules
  if (!rules) return []

  for (let i = 0; i < rules.length; i++) {
    const declarations = (rules[i] as Rule).declarations
    if (!declarations) continue
    for (let j = 0; j < declarations.length; j++) {
      const property = (declarations[j] as Declaration).property
      if (!property) continue
      properties.push(property)
    }
  }
  return properties
}

function substringsWithOpenAndCloseTokens(content: string, open: string, close: string) {
  let index = 0
  const start = content.indexOf(open)
  const css = []
  while (start !== -1 && index < content.length) {
    const end = content.indexOf(close, start + open.length)
    if (end === -1) {
      throw new Error("No matching close token found")
    }
    const styleAttributeContent = content.substring(start + open.length, end)
    css.push(styleAttributeContent)
    index = end + close.length
  }
  return css
}

export const OPEN_STYLE_TAG = '<style>'
export const CLOSE_STYLE_TAG = '</style>'

export function getInternalCSS(htmlFileContent: string): string[] {
  return substringsWithOpenAndCloseTokens(htmlFileContent, OPEN_STYLE_TAG, CLOSE_STYLE_TAG)
}

export const STYLE_ATTRIBUTE = 'style'
const STYLE_ATTRIBUTE_OPEN = STYLE_ATTRIBUTE + "=\""

export function getInlineCSS(htmlFileContent: string): string[] {
  return substringsWithOpenAndCloseTokens(htmlFileContent, STYLE_ATTRIBUTE_OPEN, "\"")
}

export async function getCSSFromHTMLFile(fileName: string): Promise<string[]> {
  const fileContent = await readFile(fileName, 'utf8')
  const internal = getInternalCSS(fileContent)
  const inline = getInlineCSS(fileContent)
  return [...internal, ...inline]
}

export async function getCSSFromCSSFile(fileName: string): Promise<string[]> {
  const data = await readFile(fileName, 'utf8')
  return [data]
}

export async function getCSSFromFile(fileName: string): Promise<string[]> {
  const fileExtension = fileName.split('.').pop();
  switch (fileExtension) {
    case "html":
      return await getCSSFromHTMLFile(fileName)
    case "css":
      return await getCSSFromCSSFile(fileName)
    default:
      break
  }
  return []
}

async function extractRawCSS(fileNames: string[]): Promise<string[]> {
  const aggregatedRawCSS: string[] = []
  await Promise.all(fileNames.map(async (fileName) => {
    const rawCSS = await getCSSFromFile(fileName)
    aggregatedRawCSS.push(...rawCSS)
  }))
  return aggregatedRawCSS
}

export async function analyseCSS(fileNames: string[]): Promise<void> {
  const css = await extractRawCSS(fileNames)
  const properties: string[] = []
  css.forEach((css) => {
    properties.push(...getPropertiesFromCSS(css))
  })
  const minimumSupport: { [key in BrowserNames]: number } = {
    'chrome': 0,
    'chrome_android': 0,
    'edge': 0,
    'firefox': 0,
    'firefox_android': 0,
    'ie': 0,
    'nodejs': 0,
    'opera': 0,
    'opera_android': 0,
    'safari': 0,
    'safari_ios': 0,
    'samsunginternet_android': 0,
    'webview_android': 0
  }
  properties.forEach((property) => {
    const propertySupport = data[property]
    if (!propertySupport) {
      return
    }
    Object.entries(propertySupport).forEach(([browser, version]) => {
      if (minimumSupport[browser as BrowserNames] < version) {
        minimumSupport[browser as BrowserNames] = version
      }
    })
  })
  console.log(minimumSupport)
}
