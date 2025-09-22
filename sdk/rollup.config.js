const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const { default: dts } = require('rollup-plugin-dts');
const { readFileSync } = require('fs');

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'react',
  'react-dom'
];

const plugins = [
  resolve({
    browser: true,
    preferBuiltins: false
  }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: false,
    declarationMap: false
  })
];

module.exports = [
  // ES Module build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    },
    external,
    plugins
  },
  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    external,
    plugins
  },
  // Type definitions
  {
    input: 'src/index.ts',
    output: {
      file: pkg.types,
      format: 'esm'
    },
    external,
    plugins: [dts()]
  }
];