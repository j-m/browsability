import { assess } from '../assess'
import { init } from '../init'
import { BrowsabilityMessage } from '../common/BrowsabilityMessage'

export default async function parse(args: string[]): Promise<void> {
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
      await assess(args)
      break
  }
}
