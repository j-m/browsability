const bcd = require('mdn-browser-compat-data');
var css = require('css');
var fs = require('fs');
var jsonfile = require('jsonfile');

var exports = module.exports = {};

function getFileCssProperties(details, config, contents) {
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


exports.checkFiles = function (details, config) {
    var files = config['filesRes'];

    var allProperties = [];

    files.forEach(function (file) {
        var contents = fs.readFileSync(file, 'utf8');
        var curProperties = getFileCssProperties(details, config, contents);
        curProperties.forEach(function (props) {
            allProperties.push(props);
        });
    });

    result = {
        'succ': true,
        'minimum-support': {
            "webview_android": "1",
            "chrome": "1",
            "chrome_android": "1",
            "edge": "1",
            "edge_mobile": "1",
            "firefox": "1",
            "firefox_android": "1",
            "ie": "1",
            "opera": "1",
            "opera_android": "1",
            "safari": "1",
            "safari_ios": "1"
        },
        'properties': {},
    };

    allProperties.forEach(function (p) {
        var compatInfo = bcd.css.properties[p]['__compat'];
        result['properties'][p] = compatInfo;

        Object.keys(result['minimum-support']).forEach(function (browser) {
            var currentMinBrowser = result['minimum-support'][browser];
            var propSupportVersion = result.properties[p].support[browser]['version_added'];

            if (currentMinBrowser < propSupportVersion) {
                result['minimum-support'][browser] = propSupportVersion;
            }
        })
    });

    console.log(JSON.stringify(result, null, 2));

    var filename = encodeURIComponent(details.repoName) + "-" + encodeURIComponent(details.headCommit);
    jsonfile.writeFileSync(__dirname + "/json/" + filename + ".json", result);

    return result;
}