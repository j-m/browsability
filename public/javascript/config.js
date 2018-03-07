var config = {
	strict:false, /*partial support counts as supported*/
	files: [
		".html", ".css",
		exclusions: [], /*exact file names (with path from root) to exclude from the scan*/
		inclusions: []	/*exact file names (with path from root) to additionally include in the scan*/
	],
	browsers: {
		"chrome": 62, 
		"firefox", /*versions are not required; interpreted as latest*/
		"safari", 
		"edge": 16, 
		"ie": 11
	}
}