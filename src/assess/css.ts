const bcd = require('mdn-browser-compat-data'),
    css = require('css'),
    fs = require('fs'),
    jsonfile = require('jsonfile'),
    exports = module.exports = {};
    
function getFileCssProperties(contents) {
  contents = contents.substring(contents.indexOf("<style>") + 7);
  contents = contents.substring(0, contents.indexOf("</style>"));
  if (contents.length < 1) return [];

  var properties = [];

  var cssObj = css.parse(contents);
  var rules = cssObj.stylesheet.rules;
  if (rules == null) return [];

  for (var i = 0; i < rules.length; i++) {
      var declarations = rules[i].declarations;
      if (declarations == null) return [];
      for (var j = 0; j < declarations.length; j++) {
          var property = declarations[j].property;
          if (property == null) return [];
          properties.push(property);
      }
  }

  return properties;
}
