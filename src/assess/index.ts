import glob from 'fast-glob'
import { BrowsabilityConfiguration } from '../config/Configuration'

export default async function assess(config: BrowsabilityConfiguration) {

  await glob("./**/*.js", { ignore: config.exclude  })
}
