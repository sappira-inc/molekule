module.exports = {
  setupFilesAfterEnv: ['react-testing-library/cleanup-after-each', '<rootDir>/test/setup.js'],
  testMatch: ['<rootDir>/src/**/*.spec.js'],
};
