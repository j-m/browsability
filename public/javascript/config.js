var config = {
	strict:false, 				/* False: partial support counts as supported; True: doesn't count*/
	css: true, 
	html: false, 				/* Coming soon*/
	javascript: false,			/* Coming soon*/
	files: [
		".html", ".css"
	],
	exclusions: [], 			/* Exact file names (with path from root) to exclude from the scan*/
	inclusions: [],				/* Additional inclusions - if file-type is already listed, it will be scanned twice - which is a waste of your time)*/
	browsers: {
		"chrome": 62, 
		"firefox", 				/* Versions are not required; will tell you the minimum version supported */
		"safari": "current", 	/* Matches the 'status' attributes in `mdn/browser-compat-data/browsers` */
		"edge": 16, 
		"ie": 11
	}
}