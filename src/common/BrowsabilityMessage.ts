export class BrowsabilityMessage {
  private constructor(public id: string, public message: string) {}

  static readonly HELP = new BrowsabilityMessage(
    'HELP',
    `
browsability <command>
<command>:
  -v or --version                 Output Browsability version
  -h or --help                    Output this help information
  -e or --examples                Output some examples
  -i or --init                    Copy Browsability template to the current folder
  --init <directory>              Copy Browsability template to a relative or absolute filepath
  <directory>                     Run Browsability against a directory with the default settings. Will still look for a config file
  <directory> <flag>              Run Browsability against a directory with custom settings.

<directory>                       Relative or absolute filepath(s). Glob enabled. Start with ./ for a relative file
<flag>                            Optional arguments. Any combination of:
  -s or --silent                  No console output. Default: false
  -f or --full                    Report minimum version for all browsers, not just those configured. Default: true
  -c or --config  <directory>     Configuration file location. 

Run 'browsability -e' for examples
`,
  )

  static readonly VERSION = new BrowsabilityMessage(
    'VERSION',
    process.env.npm_package_version || 'unknown',
  )
}
