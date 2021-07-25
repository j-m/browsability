import { BrowsabilityConfiguration } from '../config/Configuration'
import { analyseCSS } from './css'

const html = "C:\\Users\\Jon\\Desktop\\react-default\\build\\index.html"
const css = "C:\\Users\\Jon\\Desktop\\react-default\\build\\static\\css\\main.a617e044.chunk.css"

export default async function assess(config: BrowsabilityConfiguration[], cwd: string): Promise<void> {
  analyseCSS([html, css])
  return
}
