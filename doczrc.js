export default {
  base: process.env.NODE_ENV === 'production' ? '/molekule' : '',
  title: 'Molekule',
  dest: './dist',
  description: 'React UI Framework based on styled-components and styled-system',
  port: 1234,
  wrapper: 'docs/wrapper.js',
  propsParser: true,
  modifyBundlerConfig: config => {
    config.optimization = {
      runtimeChunk: true,
      nodeEnv: 'production',
      namedModules: true,
      noEmitOnErrors: true,
      splitChunks: {
        chunks: 'all',
        name: 'vendors',
      },
      minimize: false,
    };
    return config;
  },
};
