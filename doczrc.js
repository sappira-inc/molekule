export default {
  base: process.env.NODE_ENV === 'production' ? '/refractal' : '',
  title: 'Refractal',
  dest: './dist',
  description: 'React UI Framework based on styled-components and styled-system',
  port: 1234,
  wrapper: 'docs/wrapper.js',
  propsParser: true,
};
