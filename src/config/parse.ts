import path from 'path'
import { promises as fs } from 'fs'
import { BrowsabilityError } from '../common/BrowsabilityError'
import { BrowsabilityConfiguration } from './Configuration'

export const CONFIG_FILE_NAME = `.browsability.js`

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
    const locations = [filepath, path.join(filepath, `/${CONFIG_FILE_NAME}`)]
    for (const location in locations) {
      if (exists(location)) {
        return location
      }
    }
    throw BrowsabilityError.MISSING_FILE(...locations)
  } else {
    const locations = [`./${CONFIG_FILE_NAME}`, `./config/${CONFIG_FILE_NAME}`]
    for (const location in locations) {
      if (exists(location)) {
        return location
      }
    }
    throw BrowsabilityError.MISSING_FILE(...locations)
  }
}

async function loadFile(location: string): Promise<string> {
  try {
    const content: string = await fs.readFile(location, 'utf8')
    return content
  } catch (error) {
    throw BrowsabilityError.READ_FAILED(...location, error)
  }
}

async function parseFile(content: string): Promise<BrowsabilityConfiguration> {
  try {
    const config: BrowsabilityConfiguration = JSON.parse(content)
    return config
  } catch (error) {
    throw BrowsabilityError.PARSE_FAILED(error)
  }
}

export async function load(file: string): Promise<BrowsabilityConfiguration> {
  const location: string = await parseLocation(file)
  const content: string = await loadFile(location)
  const config: BrowsabilityConfiguration = await parseFile(content)
  return config
}
