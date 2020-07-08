export class BrowsabilityError {
  constructor(
    public id: string,
    public message: string,
    public suggestion: string,
    public error?: string[]
  ) {}
}

export const Error = {
  MULTIPLE_COMMANDS: new BrowsabilityError(
    'MULTIPLE_COMMANDS',
    'Browsability does not support running multiple commands in one.',
    'Run different commands like `--version` and `--help` separately.'
  ),
  MISSING_FILE: (...error: string[]): BrowsabilityError =>
    new BrowsabilityError(
      'MISSING_FILE',
      'Could not find Browsability config file',
      'Check the following path has a `.browsability.hjson` file. If not, provide a full filename.',
      error
    ),
  PARSE_FAILED: (...error: string[]): BrowsabilityError =>
    new BrowsabilityError(
      'PARSE_FAILED',
      'Could not parse Browsability config file',
      'Check the contents of the following file and make sure it exactly implements the template.',
      error
    ),
}
