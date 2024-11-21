export default {
  collectCoverage: true,
  collectCoverageFrom: [
    '!src/**/*.spec.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/stories.tsx'
  ],

  // The test environment that will be used for testing
  // https://mswjs.io/docs/faq/#requestresponsetextencoder-is-not-defined-jest
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['']
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/src/**/*.(spec|test).ts?(x)'],
  // Whether to use watchman for file crawling
  watchman: false
}
