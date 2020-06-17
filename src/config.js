var config = {
	strict: false, 			    // Partial support does not count as supported
	css: true,              // Assess CSS
	html: false,            // Assess HTML
	javascript: false,      // Assess JavaScript
  include: [],				    // List of files to scan. Glob enabled 
  exclude: [], 		  	    // List of files to exclude from the scan. Glob enabled
	browsers: {
		"chrome": 62, 
		"firefox":"", 				// Versions are not required; will tell you the minimum version supported */
		"safari": "current", 	// Matches the 'status' attributes in `mdn/browser-compat-data/browsers` */
		"edge": 16, 
		"ie": 11
	}
}
