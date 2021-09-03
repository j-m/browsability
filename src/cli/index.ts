import assess from '../assess'
import { BrowsabilityConfiguration } from '../config/Configuration'
import { BrowsabilityMessage } from '../common/BrowsabilityMessage'

function init(args: string[]): void { }

export function parseCommand(args: string[]): BrowsabilityConfiguration[] {
  return []
}

export default async function cli(args: string[]): Promise<void> {
  switch (args[0]) {
    case '-v':
    case '--version':
      console.log(BrowsabilityMessage.VERSION)
      break
    case '-h':
    case '--help':
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
