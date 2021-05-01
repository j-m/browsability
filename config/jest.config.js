module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['../src/**/*.ts', '!**/node_modules/**'],
  roots: ['../node_modules/@types', '../test/unit'],
}
