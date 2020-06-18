import { join } from 'path'

import config from './config'

export default function(flags: any){
  console.log(JSON.stringify(flags))
  config(join(process.cwd(), flags.config))
}
