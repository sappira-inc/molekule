module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: ['<rootDir>/src/**/*.spec.(ts|js|tsx|jsx)'],
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/src/$1',
  },
};
