
'use strict'

process.env.BABLE_ENV = 'test'
process.env.NODE_ENV = 'test'
process.env.PUBLIC_URL = ''

process.on('unhandledRejection', err => {
  throw err
})

const jest = require('jest')
const argv = process.argv.slice(2)

const createJestConfig = require('../utils/create-jest-config')

argv.push(
  '--config',
  JSON.stringify(
    createJestConfig()
  )
)

const path = require('path')
const paths = require('../config/paths')
const fs = require('fs')
fs.writeFileSync(
  path.join(paths.appRoot, 'jest-config.json'),
  JSON.stringify(createJestConfig(), null, '  ')
)

jest.run(argv)
