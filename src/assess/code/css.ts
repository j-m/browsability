import { parse, Declaration, Rule } from 'css'

export interface Position {
  line: number;
  column: number;
}
export type PropertyValueOccurrence = { [key in string]: { [key in string]: Position[] } }

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
