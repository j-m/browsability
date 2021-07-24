import bcd from '@mdn/browser-compat-data'
import { parse, Declaration, Rule } from 'css'

export const OPEN_STYLE_TAG = '<style>'
export const CLOSE_STYLE_TAG = '</style>'
const OPEN_STYLE_TAG_LENGTH = OPEN_STYLE_TAG.length
const CLOSE_STYLE_TAG_LENGTH = CLOSE_STYLE_TAG.length

export function getInternalCSS(htmlFileContent: string): string[] {
  let index = 0
  const start = htmlFileContent.indexOf(OPEN_STYLE_TAG)
  const css = []
  while (start !== -1 && index < htmlFileContent.length) {
    const end = htmlFileContent.indexOf(CLOSE_STYLE_TAG, start + OPEN_STYLE_TAG_LENGTH)
    if (end === -1) {
      throw new Error("No closing style tag")
    }
    const contentBetweenStyleTags = htmlFileContent.substring(start + OPEN_STYLE_TAG_LENGTH, end)
    css.push(contentBetweenStyleTags)
    index = end + CLOSE_STYLE_TAG_LENGTH
  }
  return css
}

export const STYLE_ATTRIBUTE = 'style'
const STYLE_ATTRIBUTE_OPEN = STYLE_ATTRIBUTE + "=\""
const STYLE_ATTRIBUTE_OPEN_LENGTH = STYLE_ATTRIBUTE_OPEN.length

export function getInlineCSS(htmlFileContent: string): string[] {
  let index = 0
  const start = htmlFileContent.indexOf(STYLE_ATTRIBUTE_OPEN)
  const css = []
  while (start !== -1 && index < htmlFileContent.length) {
    const end = htmlFileContent.indexOf("\"", start + STYLE_ATTRIBUTE_OPEN_LENGTH)
    if (end === -1) {
      throw new Error("Style attribute not closed")
    }
    const styleAttributeContent = htmlFileContent.substring(start + STYLE_ATTRIBUTE_OPEN_LENGTH, end)
    css.push(styleAttributeContent)
    index = end + 1
  }
  return css
}

export function getPropertiesFromCSS(css: string): string[] {
  const properties = []


  const cssObj = parse(css)
  if (!cssObj || !cssObj.stylesheet) return []
  const rules = cssObj.stylesheet.rules
  if (!rules) return []

  for (let i = 0; i < rules.length; i++) {
    const declarations = (rules[i] as Rule).declarations
    if (!declarations) return []
    for (let j = 0; j < declarations.length; j++) {
      const property = (declarations[j] as Declaration).property
      if (!property) return []
      properties.push(property)
    }
  }
  return properties
}


export function anaylse(fileContents: string[]): void {
  for (const content in fileContents) {
    getPropertiesFromCSS(content)
  }
}
