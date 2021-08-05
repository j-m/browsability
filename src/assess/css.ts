import { readFile } from 'fs/promises'

import { parse, Declaration, Rule } from 'css'
import { BrowserNames } from '@mdn/browser-compat-data/types'
import { data, Support } from '../data/css'

export interface Position {
  line: number;
  column: number;
}
export type PropertyValueOccurrence = { [key in string]: { [key in string]: Position[] } }

export function getPropertiesFromCSS(css: string): PropertyValueOccurrence {
  const properties: PropertyValueOccurrence = {}

  const cssObj = parse(css)
  if (!cssObj || !cssObj.stylesheet) return {}
  const rules = cssObj.stylesheet.rules
  if (!rules) return {}

  for (const rule of rules) {
    const declarations = (rule as Rule).declarations
    if (!declarations) continue
    for (const declaration of declarations) {
      const property = (declaration as Declaration).property
      if (!property) continue
      const value = (declaration as Declaration).value
      if (!value) continue
      if (!properties[property]) properties[property] = {}
      if (!properties[property][value]) properties[property][value] = []
      properties[property][value].push(((declaration as Declaration).position?.start) as Position)
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

function maximum(supportA: Support, supportB: Support): Support {
  return Object.entries(supportA).reduce((accumulator, [browser, version]) => ({
    ...accumulator, [browser]: (supportB[browser as BrowserNames] > version) ? supportB[browser as BrowserNames] : version
  }), {} as Support)
}

const ZERO_SUPPORT: Support = {
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

function calculateMinimumSupport(properties: PropertyValueOccurrence) {
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

export function getPropertiesFromMultipleCSS(css: string[]): PropertyValueOccurrence {
  const combinedProperties: PropertyValueOccurrence = {}
  css.forEach((css) => {
    const properties = getPropertiesFromCSS(css)
    Object.entries(properties).forEach(([property, values]) => {
      Object.keys(values).forEach((value) => {
        if (!combinedProperties[property]) combinedProperties[property] = {}
        if (!combinedProperties[property][value]) combinedProperties[property][value] = []
        combinedProperties[property][value].push(...properties[property][value])
      })
    })
  })
  return combinedProperties
}

export async function analyseCSS(fileNames: string[]): Promise<void> {
  const css = await extractRawCSS(fileNames)
  const properties = getPropertiesFromMultipleCSS(css)
  const support = calculateMinimumSupport(properties)
  console.dir(properties, { depth: null })
  console.dir(support, { depth: null })
}
