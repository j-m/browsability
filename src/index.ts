import { BrowsabilityConfiguration } from 'config/Configuration'
import { cli } from './cli/parse'

export default function browsability(config: BrowsabilityConfiguration[], cwd: string): void {
  assess(config, cwd)
}

if (require.main === module) {
  try {
    const [, , ...args] = process.argv
    cli(args)
  } catch (error) {
    console.error(error)
    process.exitCode = 1
  }
}
