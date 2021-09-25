<p align="center">
  <a href="https://github.com/j-m/browsability">
    <img src="docs/design/logo-banner.svg" alt="logo" height="80"/>
  </a>
  
  <p align="center">
    <img alt="not ready for production" src="https://img.shields.io/badge/Production-Not%20Ready-red?style=flat-square"/>
    <a href="https://npmjs.org/package/browsability"><img alt="version" src="https://img.shields.io/npm/v/browsability.svg?style=flat-square"/></a>
    <a href="https://npmjs.org/package/browsability"><img alt="downloads per week" src="https://img.shields.io/npm/dw/browsability.svg?style=flat-square"/></a>
    <a href="https://github.com/j-m/browsability/blob/master/package.json"><img ="license" src="https://img.shields.io/npm/l/browsability.svg?style=flat-square"/></a>
    <a href="https://semver.org/"><img alt="semantic versioning" src="https://img.shields.io/static/v1?label=versioning&message=SemVer&color=informational&style=flat-square"/></a>
    <a href="http://commitizen.github.io/cz-cli"><img alt="commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square"/></a>
  </p>
</p>

## About

Scan your HTML, CSS, and JavaScript to find out the minimum browser version that you support.  
No guessing. No arduous tests. Just data.  

Browsability is designed to be run as a CLI tool, no webdrivers or complex emulation. For now, we use just [MDN's compatibility data](https://github.com/mdn/browser-compat-data), so you can only assess [these browsers](https://github.com/mdn/browser-compat-data/tree/master/browsers).

## Quick links

[Roadmap](https://github.com/j-m/browsability/projects/1)  
[Changelog](./docs/changelog.md)  
[Docs](./docs)  

## Getting Started

### Installation

```txt
npm i -D browsability
```

### Commands

```txt
browsability -v (or --version)       (Output Browsability version)
browsability -h (or --help)          (Output the help information)
browsability --init <directory>      (Copy Browsability template to relative or absolute path)
browsability <directory> <flag>      (Glob pattern of files to run Browsability against <directory>)  
browsability                         (Run with default settings)
```

Where `<directory>` is a relative (starting with `./`) or absolute filepath.  
Where `<flag>` is any combination of the **optional** arguments:  

```txt
-s (or --silent)                   (No console output)
-c (or --config) <directory>       (Configuration file location)
-f (or --full)                     (Report minimum version for all browsers, not just those configured)
```

### Settings

Refer to [the docs](./docs/settings.md) for all options and what each command could throw.  
Example `.browsability.js` file:

```js
[{
  scope: 'full'           // 'full': assess everything. 'diff': assess changes only (requires git)
  css: true               // Assess CSS  
  html: true              // Assess HTML  
  javascript: true        // Assess JavaScript  
  include: [              // List of files to scan. Glob enabled  
    "./**/*"
  ]
  exclude: [              // List of files to exclude from the scan. Glob enabled  
    "**/node_modules/**"
  ]
  versions: {             // The minimum browser version that your project must support  
    chrome: 62
    safari: "current"     // Matches the 'status' attributes in `mdn/browser-compat-data/browsers`  
    edge: 16
    ie: 11
  },
  assess: [               // Find minimum browser version support without throwing. e.g. 'all' or ['firefox']
    'firefox'
  ]
}]
```

## Contributors

|[![j-m](https://avatars.githubusercontent.com/j-m?s=100)<br/>j-m](https://github.com/j-m/)|[![jmsv](https://avatars.githubusercontent.com/jmsv?s=100)<br/>jmsv](https://github.com/jmsv/) |  
|:-:|:-:|
