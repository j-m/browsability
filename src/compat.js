const bcd = require('mdn-browser-compat-data'),
    css = require('css'),
    fs = require('fs'),
    jsonfile = require('jsonfile'),
    exports = module.exports = {};

var files = [], config = {};
function getContents(name, path, token) {
    var uri = 'https://raw.githubusercontent.com/' + name + '/master/' + path + '?access_token=' + token;
    $.get(uri, function (data) {
        return { file: path, content: data };
    });
}
exports.getFile = function (name, token) {
    $.getJSON('https://api.github.com/repos/' + name + '/commits/master?access_token=' + token, function (latest) { //get latest commit on master
        $.getJSON('https://api.github.com/repos/' + name + '/git/trees/' + latest.sha + '?recursive=1&access_token=' + token, function (data) { //get tree object with paths
            $.each(data.tree, function (index) {
                var file = data.tree[index];
                if (file.type == "blob") {
                    var fileType = file.path.substr(file.path.lastIndexOf("."));
                    if (fileType == ".browsability")
                        config = getContents(name, file.path, token); /*TODO*/
                    else if (fileType == ".css")
                        files.push(getContents(name, file.path, token));
                    else if (fileType == ".html")
                        files.push(getContents(name, file.path, token));
                }
            });
        });
    });
}

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

exports.checkFiles = function () {
    var allProperties = [];
    files.forEach(function (file) {
        var contents = files[file].content;
        var curProperties = getFileCssProperties(contents);
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
        'browser-tests': {
            "webview_android": true,
            "chrome": true,
            "chrome_android": true,
            "edge": true,
            "edge_mobile": true,
            "firefox": true,
            "firefox_android": true,
            "ie": true,
            "opera": true,
            "opera_android": true,
            "safari": true,
            "safari_ios": true
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
        });
    });

    Object.keys(config['browsers']).forEach(function (b) {
        if (config['browsers'][b] < result['minimum-support'][b]) {
            result['browser-tests'][b] = false;
        }
    });

    var tests = Object.values(result['browser-tests']);
    var testsValues = [];
    tests.forEach(function (passed) {
        testsValues.push(passed);
    })
    result.succ = testsValues.every(function (v) {
        return v;
    });

    console.log(JSON.stringify(result, null, 2));
    console.log(details.headCommit);

    var filename = encodeURIComponent(details.repoName) + "-" + encodeURIComponent(details.headCommit);
    jsonfile.writeFileSync(__dirname + "/json/" + filename + ".json", result);

    return result;
}