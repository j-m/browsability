import glob from 'fast-glob'
import path from 'path'
import { promises as fs } from 'fs'
import { BrowsabilityConfiguration } from './Configuration'
import BrowsabilityError from '../common/BrowsabilityError'

export const CONFIG_FILE_NAME = '.browsability.js'

async function exists(filepath: string): Promise<boolean> {
  try {
    await fs.access(filepath)
    return true
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }
    return false
  }
}

async function parseLocation(filepath?: string): Promise<string> {
  const locations = [
    `./${CONFIG_FILE_NAME}`,
    `./config/${CONFIG_FILE_NAME}`,
  ]
  if (filepath) {
    locations.unshift(filepath, path.join(filepath, `/${CONFIG_FILE_NAME}`))
  }
  locations.forEach(async (location) => {
    if (await exists(location)) {
      return location
    }
  })
  throw BrowsabilityError.MISSING_FILE(...locations)
}

async function loadFile(location: string): Promise<string> {
  try {
    const content: string = await fs.readFile(location, 'utf8')
    return content
  } catch (error) {
    throw BrowsabilityError.READ_FAILED(location, error)
  }
}

async function parseFile(content: string): Promise<BrowsabilityConfiguration[]> {
  try {
    const config: BrowsabilityConfiguration[] = JSON.parse(content)
    return config
  } catch (error) {
    throw BrowsabilityError.PARSE_FAILED(error)
  }
}

async function expandGlobs(config: BrowsabilityConfiguration[]): Promise<BrowsabilityConfiguration[]> {
  await glob('./**/*.js', { ignore: config[0].exclude })// TODO
  return config
}

export async function load(file: string): Promise<BrowsabilityConfiguration[]> {
  const location: string = await parseLocation(file)
  const content: string = await loadFile(location)
  const configWithGlobbedFilePaths: BrowsabilityConfiguration[] = await parseFile(content)
  const configWithExpandedFilePaths: BrowsabilityConfiguration[] = await expandGlobs(configWithGlobbedFilePaths)
  return configWithExpandedFilePaths
}
