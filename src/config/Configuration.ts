export type Browser = 'chrome'
export type Version = 'any' | 'current' | number
export type BrowserVersions = { [key in Browser]: Version }
export type Configuration = {
  smart: boolean
  css: boolean
  html: boolean
  javascript: boolean
  include: string[]
  exclude: string[]
  versions: BrowserVersions
  assess: Browser[]
}
