import { load } from '../parse/config'

export default function(args: Array<string>) {
  console.log(args)

  console.log(`
browsability assess <option>

<option> is one one of:
  <option> <option>
  -s or --silent           (No console output)
  -c or --config           (Use config file. Start with './' for relative files)
  -f or --full             (Report minimum version for all browsers, not just those configured)
  `)


  load(args[1])
}
