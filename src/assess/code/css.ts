import {
  Declaration, Rule, parse, Comment, AtRule, Media,
} from 'css'
import { Support } from '../../data/css'
import { Position, PropertyData, ZERO_SUPPORT } from '../json/css'

const CSS_PARSER_TYPES = [
  'stylesheet',
  'rule',
  'declaration',
  'comment',
  'charset',
  'custom-media',
  'document',
  'font-face',
  'host',
  'import',
  'keyframes',
  'keyframe',
  'media',
  'namespace',
  'page',
  'supports',
]
type CSSParserType = typeof CSS_PARSER_TYPES[number]

export function combinePropertyValueOccurrence(a: PropertyData, b: PropertyData): PropertyData {
  const combinedProperties: PropertyData = a

  Object.keys(b).forEach((property) => {
    Object.keys(b[property].values).forEach((value) => {
      if (!combinedProperties[property]) combinedProperties[property] = { values: {} }
      if (!combinedProperties[property].values[value]) combinedProperties[property].values[value] = { positions: [] }
      combinedProperties[property].values[value].positions.push(...b[property].values[value].positions)
    })
  })

  return combinedProperties
}

export function getPropertiesFromRuleTypeRule(rule: Rule): PropertyData {
  const properties: PropertyData = {}

  const { declarations } = rule as Rule
  (declarations || []).forEach((declaration) => {
    const { property } = declaration as Declaration
    if (!property) return
    const { value } = declaration as Declaration
    if (!value) return
    if (!properties[property]) properties[property] = { values: {} }
    if (!properties[property].values[value]) properties[property].values[value] = { positions: [] }
    properties[property].values[value].positions.push(((declaration as Declaration).position?.start) as Position)
  })

  return properties
}

export function getPropertiesFromRule(rule: Rule | AtRule | Comment): PropertyData {
  switch (rule.type as CSSParserType) {
    case 'rule':
      return getPropertiesFromRuleTypeRule(rule as Rule)
    case 'media':
      // TODO Do something with `(rule as Media).media`
      return ((rule as Media).rules || [])
        .reduce((accumulator, value) => combinePropertyValueOccurrence(accumulator, getPropertiesFromRule(value)),
          {} as PropertyData)
    case 'comment':
    default:
      return {}
  }
}
export function getPropertiesFromRules(rules: Array<Rule | Comment | AtRule>): PropertyData {
  const properties: PropertyData = {}
  rules.forEach((rule) => {
    combinePropertyValueOccurrence(properties, getPropertiesFromRule(rule))
  })
  return properties
}

export function getPropertiesFromCSS(css: string): PropertyData {
  const cssObj = parse(css)
  if (!cssObj || !cssObj.stylesheet) return {}
  const { rules } = cssObj.stylesheet
  if (!rules) return {}
  return getPropertiesFromRules(rules)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function lookupPropertyValueSupport(property: string, value: string): Support {
  return ZERO_SUPPORT
}

export function addSupportDataToPropertyDataPropertyValues(input: PropertyData): PropertyData {
  const output = { ...input }
  Object.entries(input).forEach(([propertyName, propertyData]) => {
    Object.entries(propertyData.values).forEach(([valueName, valueData]) => {
      output[propertyName].values[valueName] = {
        positions: valueData?.positions, support: lookupPropertyValueSupport(propertyName, valueName),
      }
    })
  })
  return output
}

export function getPropertiesFromMultipleCSS(cssStrings: string[]): PropertyData {
  const combinedProperties: PropertyData = {}
  cssStrings.forEach((cssString) => {
    const properties = getPropertiesFromCSS(cssString)
    combinePropertyValueOccurrence(combinedProperties, properties)
  })
  return combinedProperties
}
