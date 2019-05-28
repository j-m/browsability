<img src="design/logo-banner.svg" width="100%">

## What is it?

A HTML/CSS/JavaScript browser-compatibilty anaylser. 

Scans your GitHub repositories for any CSS, HTML, and JavaScript and figures out the minimum version each browser supports your project.

This uses [MDN's compatibilty data](https://github.com/mdn/browser-compat-data) to find the support for each feature; therefore if you are targetting a browser they do not support, this tool will not be able to help you.

You can (and should) override the default configuration by creating a `.browsability` file at the root of your repository. 
Take a look at `browsability/public/javascript/config.js` or this repository's `.browsability` file for examples of what you can do.

## What's left to do?
A lot. This will be forwards compatible as it uses MDN's data

- [ ] CSS
- [ ] HTML
- [ ] JavaScript
- [ ] Detect fallbacks
- [ ] GitHub status
- [ ] Webhook auto-status
- [ ] Commit/branch selection
- [ ] Completely forwards compatible
