import bcd from '@mdn/browser-compat-data'
import css, { Declaration, Rule } from 'css'
import fs from 'fs'

export function getFileCssProperties(contents: string) {
  contents = contents.substring(contents.indexOf("<style>") + 7);
  contents = contents.substring(0, contents.indexOf("</style>"));
  if (contents.length < 1) return [];

  var properties = [];

  var cssObj = css.parse(contents);
  if (!cssObj || !cssObj.stylesheet) return [];
  var rules = cssObj.stylesheet.rules;
  if (!rules) return [];

  for (var i = 0; i < rules.length; i++) {
    var declarations = (rules[i] as Rule).declarations;
    if (!declarations) return [];
    for (var j = 0; j < declarations.length; j++) {
      var property = (declarations[j] as Declaration).property;
      if (!property) return [];
      properties.push(property);
    }
  }

  return properties;
}
