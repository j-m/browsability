import parse from './command/parse'

export default function browsability(argv?: string[]): void {
  const [, , ...args] = process.argv
  parse(argv || args).catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
