module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverageFrom: ['../src/**/*.ts', '!**/node_modules/**'],
  roots: ['../node_modules/@types', '../src'],
}
