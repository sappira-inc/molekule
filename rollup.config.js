import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import cjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}).filter(dep => dep !== 'styled-components'),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    babel({
      babelrc: true,
    }),
    resolve({
      only: ['styled-components'],
      dedupe: ['react', 'react-dom', 'styled-components'],
    }),
    cjs({
      include: 'node_modules/**',
    }),
    filesize(),
  ],
};
