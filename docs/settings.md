# Settings

## --config

If `--config <path>` is a file, it will try to load that file.  
If `--config <directory>` Browsability shall look for a `.browsability.hjson` file within that directory.  
If `--config` is omitted, it will look for a config file at `<project root>/.browsability.hjson` and `<project root>/config/.browsability.hjson`.  

Throws `BrowsabilityError.MISSING_FILE` if the file does not exist.
Throws `BrowsabilityError.READ_FAILED` if Browsability cannot read the file.  
Throws `BrowsabilityError.PARSE_FAILED`  if Browsability fails to parse the file (invalid hjson, or is not a type of `BrowsabilityConfiguration`).

If `--config` is omitted, and no config files were found, Browsability will run against the current directory with the default settings.  
