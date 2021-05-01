[
  {
    full: true, // True: assess everything. False: assess changes only - requires git
    css: true, // Assess CSS
    html: true, // Assess HTML
    javascript: true, // Assess JavaScript
    include: [
      // List of files to scan. Glob enabled
      "./**/*",
    ],
    exclude: [
      // List of files to exclude from the scan. Glob enabled
      "**/node_modules/**",
    ],
    versions: {
      // The minimum browser version that your project must support
      chrome: 62,
      safari: "current", // Matches the 'status' attributes in `mdn/browser-compat-data/browsers`
      edge: 16,
      ie: 11,
    },
    assess: [
      // Find minimum browser version support without throwing. e.g. 'all' or ['firefox']
      "firefox",
    ],
  },
];
