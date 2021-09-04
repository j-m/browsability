import assess from '../assess'
import { BrowsabilityConfiguration } from '../config/Configuration'
import BrowsabilityMessage from '../common/BrowsabilityMessage'

// TODO
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function init(args: string[]): void { }

// TODO
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function parseCommand(args: string[]): BrowsabilityConfiguration[] {
  return []
}

export default async function cli(args: string[]): Promise<void> {
  switch (args[0]) {
    case '-v':
    case '--version':
      // TODO I/O output/logging
      // eslint-disable-next-line no-console
      console.log(BrowsabilityMessage.VERSION)
      break
    case '-h':
    case '--help':
      // TODO I/O output/logging
      // eslint-disable-next-line no-console
      console.log(BrowsabilityMessage.HELP)
      break
    case '--init':
      await init(args.slice(1))
      break
    default:
      await assess(parseCommand(args), '')
      break
  }
}
