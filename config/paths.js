
const fs = require('fs')
const path = require('path')
const cmpDir = fs.realpathSync(process.cwd())
const resolveCmp = relativePath => path.resolve(cmpDir, relativePath)
const pkg = require(resolveCmp('package.json'))

module.exports = {
  src: resolveCmp('src'),
  dist: resolveCmp('dist'),
  entry: resolveCmp('src/index.js')
}
