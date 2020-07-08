module.exports = {
  preset: 'ts-jest',
  collectCoverageFrom: ['**/*.{js,ts}', '!**/node_modules/**'],
  roots: ['../node_modules/@types', '../test/unit'],
}
