import { version } from '../../package.json'

export class BrowsabilityMessage {
  constructor(public id: string, public message: string) {}
}

export const Message = {
  HELP: new BrowsabilityMessage(
    'HELP',
    `browsability <command>
<command>:
  -v or --version         (Output Browsability version)
  -h or --help            (Output the help information)
  --init <directory>      (Copy Browsability template to relative or absolute path)
  <directory> <flag>      (Glob pattern of files to run Browsability against <directory>)  

<directory>               (Relative or absolute filepath. Default is .)
<flag>                    (Optional arguments. Any combination of:)
  -s or --silent          (No console output)
  -c or --config          (Configuration file location. Start with ./ for a relative file)
  -f or --full            (Report minimum version for all browsers, not just those configured)
`
  ),

  VERSION: new BrowsabilityMessage('VERSION', version),
}
