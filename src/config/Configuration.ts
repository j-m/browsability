export type Browser = 'all' | string

export type Version = 'report' | 'current' | number

export type BrowserVersions = { [key in Browser]: Version }

export type BrowsabilityConfiguration = {
  full: boolean
  css?: string[]
  html?: string[]
  javascript?: string[]
  versions?: BrowserVersions
}

export const defaultConfig: BrowsabilityConfiguration = {
  full: true,
  html: ["**/*.html","!**/node_modules/**"],
  css: ["**/*.css","!**/node_modules/**"],
  javascript: ["**/*.js","!**/node_modules/**"],
}

{
  scope: 'changes',
  include: ["./src/public/**"],
  exclude: ["**/node_modules/**"],
  assess: {
    javascript: false,
    css: false,
    html: false,
    versions: {
      chrome: current,
      firefox: report,
      ie: 10,
    }
  }
}
