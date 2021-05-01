export type Browser = 'chrome' | 'firefox' | 'safari' | 'edge' | 'ie'

export type Version = 'current' | number

export type BrowserVersions = { [key in Browser]: Version }

export type Scope = 'full' | 'diff'

export type BrowsabilityConfiguration = {
  scope: Scope
  css?: boolean
  html?: boolean
  javascript?: boolean
  include: string[]
  exclude?: string[]
  versions?: Partial<BrowserVersions>
  assess?: Browser[] | 'all'
}

export const defaultConfig: BrowsabilityConfiguration[] = [
  {
    scope: 'diff',
    css: true,
    html: true,
    javascript: true,
    include: [
      "./**/*",
    ],
    exclude: [
      "**/node_modules/**",
    ],
    assess: "all",
  },
]
