import { parse } from './parse/command'

export function run() {
  const [, , ...args] = process.argv
  parse(args)
}
