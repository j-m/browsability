import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'

import { main, module, version } from '../package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: main,
      format: 'cjs',
    },
    {
      file: module,
      format: 'es',
    },
  ],
  plugins: [
    json(),
    commonjs(),
    typescript({ tsconfig: 'config/tsconfig.json' }),
    replace({
      'process.env.npm_package_version ': version,
      preventAssignment: true,
    }),
    dts(),
  ],
}
