import { assess } from './assess'
import { init } from './init'
import { Message } from '../util/BrowsabilityMessage'

export async function parse(args: string[]): Promise<void> {
  switch (args[0]) {
    case '-v':
    case '--version':
      console.log(Message.VERSION)
      break
    case '-h':
    case '--help':
      console.log(Message.HELP)
      break
    case '--init':
      await init(args.slice(1))
      break
    default:
      await assess(args.slice(1))
      break
  }
}
