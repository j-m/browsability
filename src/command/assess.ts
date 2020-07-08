import { load } from '../config/parse'

export async function assess(args: string[]): Promise<void> {
  const path = args[1]
  if (!path) {
    return
  }
  await load(path)
}
