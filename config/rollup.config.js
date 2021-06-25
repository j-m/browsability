import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'
import cleanup from 'rollup-plugin-cleanup'

import { main, module, version } from '../package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: main,
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: module,
        format: 'es',
        sourcemap: false,
      },
    ],
    plugins: [
      resolve(),
      json(),
      commonjs(),
      typescript({ tsconfig: 'tsconfig.json' }),
      replace({
        'process.env.npm_package_version ': version,
        preventAssignment: true,
      }),
      cleanup({ comments: 'none' }),
    ],
  },
  {
    input: 'typings/index.d.ts',
    output: [{ file: 'lib/index.d.ts' }],
    plugins: [dts()],
  },
]
