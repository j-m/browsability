export class BrowsabilityError {
  private constructor(
    public id: string,
    public message: string,
    public suggestion: string,
    public error?: string[],
  ) {}

  static readonly MULTIPLE_COMMANDS = new BrowsabilityError(
    'MULTIPLE_COMMANDS',
    'Browsability does not support running multiple commands in one.',
    'Run different commands like `--version` and `--help` separately.',
  )

  static readonly MISSING_FILE = (...error: string[]): BrowsabilityError => new BrowsabilityError(
    'MISSING_FILE',
    'Could not find Browsability config file',
    'Check the following path(s) has a `.browsability.hjson` file. If not, provide a full filename.',
    error,
  )

  static readonly READ_FAILED = (...error: string[]): BrowsabilityError => new BrowsabilityError(
    'READ_FAILED',
    'Could not read file',
    'Check the file is not in use by something else.',
    error,
  )

  static readonly PARSE_FAILED = (...error: string[]): BrowsabilityError => new BrowsabilityError(
    'PARSE_FAILED',
    'Could not parse Browsability config file',
    'Check the contents of the following file and make sure it exactly implements the template.',
    error,
  )
}
