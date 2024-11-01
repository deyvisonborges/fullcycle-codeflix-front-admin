export default {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.(spec|test).ts(x)?', '!src/**/stories.tsx'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/src/**/*.(spec|test).ts?(x)']
}
