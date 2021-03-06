
'use strict'

const fs = require('fs')
const paths = require('../config/paths')

const setupTestsFile = fs.existsSync(paths.testsSetup)
  ? '<rootDir>/src/setup-tests.js'
  : undefined

module.exports = function createJestConfig () {
  return {
    rootDir: paths.appRoot,
    collectCoverageFrom: ['src/**/*.js'],
    coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
    resolver: require.resolve('jest-pnp-resolver'),
    setupFiles: [require.resolve('react-app-polyfill/jsdom')],
    setupTestFrameworkScriptFile: setupTestsFile,
    testMatch: ['<rootDir>/src/**/*.test.js'],
    testEnvironment: 'jsdom',
    testURL: 'http://localhost',
    transform: {
      '^.+\\.(js|jsx)$': paths.babelTransform,
      '^.+\\.css$': paths.cssTransform,
      '^(?!.*\\.(js|jsx|css|json)$)': paths.fileTransform
    },
    transformIgnorePatterns: [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$',
      '^.+\\.module\\.(css|sass|scss)$'
    ],
    moduleFileExtensions: ['web.js', 'js', 'json', 'web.jsx', 'jsx', 'node']
  }
}
