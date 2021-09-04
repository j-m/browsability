import {
  Declaration, Rule, parse, Comment, AtRule, Media,
} from 'css'
import { Position, PropertyValueOccurrence } from '../json/css'

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

export function combinePropertyValueOccurrence(a: PropertyValueOccurrence, b: PropertyValueOccurrence): PropertyValueOccurrence {
  const combinedProperties: PropertyValueOccurrence = a

  Object.entries(b).forEach(([property, values]) => {
    Object.keys(values).forEach((value) => {
      if (!combinedProperties[property]) combinedProperties[property] = {}
      if (!combinedProperties[property][value]) combinedProperties[property][value] = []
      combinedProperties[property][value].push(...b[property][value])
    })
  })

  return combinedProperties
}

export function getPropertiesFromRuleTypeRule(rule: Rule): PropertyValueOccurrence {
  const properties: PropertyValueOccurrence = {}

  const { declarations } = rule as Rule
  (declarations || []).forEach((declaration) => {
    const { property } = declaration as Declaration
    if (!property) return
    const { value } = declaration as Declaration
    if (!value) return
    if (!properties[property]) properties[property] = {}
    if (!properties[property][value]) properties[property][value] = []
    properties[property][value].push(((declaration as Declaration).position?.start) as Position)
  })

  return properties
}

export function getPropertiesFromRule(rule: Rule | AtRule | Comment): PropertyValueOccurrence {
  switch (rule.type as CSSParserType) {
    case 'rule':
      return getPropertiesFromRuleTypeRule(rule as Rule)
    case 'media':
      // TODO Do something with `(rule as Media).media`
      return ((rule as Media).rules || [])
        .reduce((accumulator, value) => combinePropertyValueOccurrence(accumulator, getPropertiesFromRule(value)),
          {} as PropertyValueOccurrence)
    case 'comment':
    default:
      return {}
  }
}
export function getPropertiesFromRules(rules: Array<Rule | Comment | AtRule>): PropertyValueOccurrence {
  const properties: PropertyValueOccurrence = {}
  rules.forEach((rule) => {
    combinePropertyValueOccurrence(properties, getPropertiesFromRule(rule))
  })
  return properties
}

export function getPropertiesFromCSS(css: string): PropertyValueOccurrence {
  const cssObj = parse(css)
  if (!cssObj || !cssObj.stylesheet) return {}
  const { rules } = cssObj.stylesheet
  if (!rules) return {}
  return getPropertiesFromRules(rules)
}

export function getPropertiesFromMultipleCSS(cssStrings: string[]): PropertyValueOccurrence {
  const combinedProperties: PropertyValueOccurrence = {}
  cssStrings.forEach((cssString) => {
    const properties = getPropertiesFromCSS(cssString)
    combinePropertyValueOccurrence(combinedProperties, properties)
  })
  return combinedProperties
}
