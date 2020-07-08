import path from 'path'
import { parse } from 'hjson'
import { promises as fs } from 'fs'
import { Error } from '../util/BrowsabilityError'
import { Configuration } from './Configuration'

async function exists(filepath: string): Promise<boolean> {
  try {
    await fs.access(filepath)
    return true
  } catch (error) {
    if (error.code != 'ENOENT') {
      throw error
    }
    return false
  }
}

async function parseLocation(filepath?: string): Promise<string> {
  if (filepath) {
    const locations = [filepath, path.join(filepath, '/.browsability.hjson')]
    for (const location in locations) {
      if (exists(location)) {
        return location
      }
    }
    throw Error.MISSING_FILE(...locations)
  } else {
    const locations = ['./.browsability.hjson', './config/.browsability.hjson']
    for (const location in locations) {
      if (exists(location)) {
        return location
      }
    }
    throw Error.MISSING_FILE(...locations)
  }
}

async function loadFile(location: string): Promise<string> {
  try {
    const content: string = await fs.readFile(location, 'utf8')
    return content
  } catch (error) {
    throw Error.PARSE_FAILED(...location, error)
  }
}

async function parseFile(content: string): Promise<Configuration> {
  try {
    const config: Configuration = parse(content)
    return config
  } catch (error) {
    throw Error.PARSE_FAILED(error)
  }
}

export async function load(file: string): Promise<Configuration> {
  const location: string = await parseLocation(file)
  const content: string = await loadFile(location)
  const config: Configuration = await parseFile(content)
  return config
}
