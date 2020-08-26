module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['<rootDir>/src/**/*.spec.(ts|js|tsx|jsx)'],
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/src/$1',
  },
};
