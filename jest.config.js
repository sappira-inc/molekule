module.exports = {
snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['react-testing-library/cleanup-after-each', '<rootDir>/test/setup.js'],
  testMatch: ['<rootDir>/src/**/*.spec.js'],
};
