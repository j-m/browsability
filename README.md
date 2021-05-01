<img src="docs/design/logo-banner.svg" width="100%">

# About

[![Version](https://img.shields.io/npm/v/browsability.svg?style=flat-square)](https://npmjs.org/package/browsability)
[![Downloads/week](https://img.shields.io/npm/dw/browsability.svg?style=flat-square)](https://npmjs.org/package/browsability)
[![License](https://img.shields.io/npm/l/browsability.svg?style=flat-square)](https://github.com/j-m/browsability/blob/master/package.json)
[![SemVer](https://img.shields.io/static/v1?label=versioning&message=SemVer&color=informational&style=flat-square)](https://semver.org/)

Scans your project for HTML, CSS, and JavaScript and figures out the minimum browser version your project supports.  
Browsability is designed to be run as a CLI tool. Like Jest,   
Browsability uses [MDN's compatibility data](https://github.com/mdn/browser-compat-data), so will only work for [these browsers](https://github.com/mdn/browser-compat-data/tree/master/browsers).

- [Usage](#usage)
- [Commands](#commands)
- [Settings](#settings)
- [Roadmap](#roadmap)

# Contributors

|[![j-m](https://avatars.githubusercontent.com/j-m?s=100)<br/>j-m](https://github.com/j-m/)|[![jmsv](https://avatars.githubusercontent.com/jmsv?s=100)<br/>jmsv](https://github.com/jmsv/) |  
|:-:|:-:|

# Usage

```txt
npm install --save-dev browsability
```

# Commands

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

# Settings

Refer to [the docs](./docs/settings.md) for all options and what each command could throw.  
Example `.browsability` file:

```js
{
  full: true              // True: assess everything. False: assess changes only - requires git
  css: true               // Assess CSS  
  html: true              // Assess HTML  
  javascript: true        // Assess JavaScript  
  include: [              // List of files to scan. Glob enabled  
    "./**/*"
  ]
  exclude: [              // List of files to exclude from the scan. Glob enabled  
    "./node_modules/**"
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
}
```

# Roadmap

- [ ] MVP: Scan a project and find HTML/CSS/JavaScript  
- [ ] Write docs and self-assess
- [ ] Implement "full". (Assess only version control changes)  
- [ ] Cross-reference/include data from sources other than MDN  

See [the changelog](./docs/changelog.md) for version history.  
