export default {
  base: process.env.NODE_ENV === 'production' ? '/molekule' : '',
  title: 'Molekule',
  dest: './dist',
  description: 'React UI Framework based on styled-components and styled-system',
  port: 1234,
  wrapper: 'docs/wrapper.js',
  propsParser: true,
  menu: [['Introduction'], ['Guides', ['Theming']], ['Components', ['Grid']]],
  htmlContext: {
    head: {
      links: [
        {
          rel: 'stylesheet',
          href: 'https://codemirror.net/theme/dracula.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.materialdesignicons.com/2.8.94/css/materialdesignicons.min.css',
        },
      ],
    },
  },
  themeConfig: {
    mode: 'dark',
    codemirrorTheme: 'dracula',
  },
  modifyBundlerConfig: config => ({
    ...config,
    optimization: {
      runtimeChunk: true,
      nodeEnv: 'production',
      namedModules: true,
      noEmitOnErrors: true,
      splitChunks: {
        chunks: 'all',
        name: 'vendors',
      },
      minimize: false,
    },
  }),
};
