<a href="http://www.jonmarsh.tech:8084"><img src="design/logo-banner.svg" width="100%"></a>

## What is it?

HTML/CSS/JavaScript browser compatibilty anaylser. 

Scans your GitHub repositories for any CSS, HTML, and JavaScript and figures out the minimum version each browser supports your project.

We're using [MDN's compatibilty data](https://github.com/mdn/browser-compat-data) to find the support for each feature; therefore if you're targetting a browser they don't list, this tool won't be able to help you.

You can (and should) override the default configuration by creating a `.browsability` file, take a look at `browsability/public/javascript/config.js` or this repository's `.browsability` file for examples of what you can do.

For now you have to go to http://jonmarsh.tech:8084/ every time you want to check it, as I don't want to store a million repos on my server for webhooks. Webhooks let us send a lil' tick or cross grade for each commit without requiring you to rescan. We'll still add the functionality for webhooks but won't host it anywhere.

## What's left to do?
A lot. As we're trying to make this forwards compatible with MDN's data we can't hard code much. We're uni students and have several other projects that need just as much love and attention - from both coursework, and other hackathons. I'm hoping we'll get it done by September 2018, but no promises.

- [ ] CSS
- [ ] HTML
- [ ] JavaScript
- [ ] Detect fallbacks
- [ ] GitHub status
- [ ] Webhook auto-status
- [ ] Commit/branch selection
- [ ] Completely forwards compatible

## Can I help?
For now, no. Thank you, but this is the kind of thing we want to do ourselves. Once we release it, we'll change this answer to a big thumbs-up; there's bound to be some oversight from our end.
