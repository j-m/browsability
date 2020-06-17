<img src="design/logo-banner.svg" width="100%">

Scans your GitHub repositories for any CSS, HTML, and JavaScript and figures out the minimum version each browser supports your project.

This uses [MDN's compatibility data](https://github.com/mdn/browser-compat-data) to find the support for each feature; therefore if you are targeting a browser they do not support, this tool will not be able to help you.

You can (and should) override the default configuration by creating a `.browsability` file at the root of your repository.  
Take a look at `browsability/public/javascript/config.js` or this repository's `.browsability` file for examples of what you can do.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/browsability.svg)](https://npmjs.org/package/browsability)
[![Downloads/week](https://img.shields.io/npm/dw/browsability.svg)](https://npmjs.org/package/browsability)
[![License](https://img.shields.io/npm/l/browsability.svg)](https://github.com/j-m/browsability/blob/master/package.json)

<!-- toc -->
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g browsability
$ browsability COMMAND
running command...
$ browsability (-v|--version|version)
browsability/0.1.0 win32-x64 node-v14.4.0
$ browsability --help [COMMAND]
USAGE
  $ browsability COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->

<!-- commandsstop -->
