
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

jest.run(argv)
