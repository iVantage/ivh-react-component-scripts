
'use strict'

process.env.BABLE_ENV = 'test'
process.env.NODE_ENV = 'test'
//process.env.PUBLIC_URL = ''

process.on('unhandledRejection', err => {
  throw err
})

const jest = require('jest')
const argv = process.argv.slice(2)
const execSync = require('child_process').execSync

// Watch unless on CI, in coverage mode, or explicitly running all tests.
// This is a little silly (IMO), inside a git or mercurial repository you have
// to can use `--watch` otherwise you have to use `--watchAll`.

function isInGitRepo () {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' })
    return true
  } catch (err) {
    return false
  }
}

if (
  !process.env.CI &&
  argv.indexOf('--coverage') === -1 &&
  argv.indexOf('--watchAll') === -1
) {
  argv.push(isInGitRepo() ? '--watch' : '-watchAll')
}

const createJestConfig = require('../utils/create-jest-config')

argv.push(
  '--config',
  JSON.stringify(
    createJestConfig()
  ),
  '--env',
  'jsdom'
)

const path = require('path')
const paths = require('../config/paths')
const fs = require('fs')
fs.writeFileSync(
  path.join(paths.appRoot, 'jest-config.json'),
  JSON.stringify(createJestConfig(), null, '  ')
)

jest.run(argv)
