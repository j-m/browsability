export default function(args: Array<string>) {
  console.log(`
browsability <command>

<command> is one of:
  -v or --version
  -h or --help
  assess <option>         (Run browsability)
  init <option>           (Copy browsability template)
  <directory>             (Run browsability with default settings for <directory>)

browsability <command> -h (Further help on <command>)
<option> flags may have different meanings between <command>s
  `)
}
