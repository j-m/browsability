import { Declaration, Rule, parse } from 'css'

import { Position, PropertyValueOccurrence } from '../json/css'

export function getPropertiesFromCSS(css: string): PropertyValueOccurrence {
  const properties: PropertyValueOccurrence = {}

  const cssObj = parse(css)
  if (!cssObj || !cssObj.stylesheet) return {}
  const { rules } = cssObj.stylesheet
  if (!rules) return {}

  rules.forEach((rule) => {
    const { declarations } = rule as Rule
    if (!declarations) return
    declarations.forEach((declaration) => {
      const { property } = declaration as Declaration
      if (!property) return
      const { value } = declaration as Declaration
      if (!value) return
      if (!properties[property]) properties[property] = {}
      if (!properties[property][value]) properties[property][value] = []
      properties[property][value].push(((declaration as Declaration).position?.start) as Position)
    })
  })
  return properties
}

export function getPropertiesFromMultipleCSS(cssStrings: string[]): PropertyValueOccurrence {
  const combinedProperties: PropertyValueOccurrence = {}
  cssStrings.forEach((cssString) => {
    const properties = getPropertiesFromCSS(cssString)
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
