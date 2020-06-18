export default function(args: Array<string>) {
  console.log(args)

  console.log(`
browsability init <option>

<option> is one one of:
  <option> <option>
  -f or --force            (Overwrite file if exists)
  -s or --silent           (No console output)
  -d or --destination      (Destination. Include name with extension)
  `)
}
