import assess from './assess'
import cli from './cli'
import { BrowsabilityConfiguration } from './config/Configuration'

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
