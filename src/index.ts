import {Command, flags} from '@oclif/command'

import parse from './parse'

class Browsability extends Command {
  static description = ''

  static flags = {
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    init: flags.string({char: 'i', description: 'copy example configuration to folder'}),
    config: flags.string({char: 'c', default: '.browsability.hjson', description: 'configuration filepath'}),
    force: flags.boolean({char: 'f'}),
  }

  async run() {
    const {args, flags} = this.parse(Browsability)
    parse.flags(flags)
  }
}

export = Browsability
