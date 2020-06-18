import command from '../command'

export function parse(args: Array<string>){
  console.log(args)
  switch (args[0]) {
    case '--v':
    case '--version':
      command.version(args.slice(1))
      break;
    case '--h':
    case '--help':
      command.help(args.slice(1))
      break;
    case 'assess':
      command.assess(args.slice(1))
      break;
    case 'init':
      command.init(args.slice(1))
      break;
  }
}
