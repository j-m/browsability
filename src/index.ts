import { BrowsabilityConfiguration } from './config/Configuration'
import assess from './assess'
import cli from './cli'

export default function browsability(config: BrowsabilityConfiguration[], cwd: string): void {
  assess(config, cwd)
}

if (require.main === module) {
  try {
    const [, , ...args] = process.argv
    cli(args)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    process.exitCode = 1
  }
}
