
'use strict'

const fs = require('fs')
const path = require('path')
const cmpDir = fs.realpathSync(process.cwd())

const resolve = relativePath => path.resolve(__dirname, '..', relativePath)
const resolveCmp = relativePath => path.resolve(cmpDir, relativePath)

module.exports = {
  appRoot: resolveCmp('.'),
  appPkg: resolveCmp('package.json'),
  src: resolveCmp('src'),
  dist: resolveCmp('dist'),
  entry: resolveCmp('src/index.js'),
  testsSetup: resolve('config/jest/setup-tests.js'),
  babelTransform: resolve('config/jest/babel-transform.js'),
  cssTransform: resolve('config/jest/css-transform.js'),
  fileTransform: resolve('config/jest/file-transform.js'),
}
