import { parse } from 'hjson'
import { readFileSync } from 'fs'

type BrowserVersion = "any" | "current" | number
type Browsers = {[key: string]: BrowserVersion}
interface configuration {
  strict: boolean
  css: boolean     
  html: boolean
  javascript: boolean
  include: Array<string>
  exclude: Array<string>
  browsers: Browsers
}

export function load(file: string): configuration {
  const content: string = readFileSync(file,'utf8')
  const config: configuration = parse(content)
  return config
}
