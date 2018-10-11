
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

const fs = require('fs-extra')
const webpack = require('webpack')
const chalk = require('chalk')
const config = require('../config/webpack.config')
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages')
const paths = require('../config/paths')

const argv = process.argv.slice(2)

fs.emptyDir(paths.dist)
  .then(build)
  .then(({ warnings }) => {
    if (warnings.length) {
      console.log(chalk.yellow('Compiled with warnings.\n'))
      console.log(warnings.join('\n\n'))
    } else {
      console.log(chalk.green('Compiled successfully.\n'))
    }
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })

function build () {
	const compiler = webpack(config)
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      let messages
      if (err) {
        return reject(err)
      } else {
        messages = formatWebpackMessages(
          stats.toJson({ all: false, warnings: true, errors: true })
        )
      }
      if (messages.errors.length) {
        messages.errors.length = 1
        return reject(new Error(messages.errors[0]))
      }

      const resolveArgs = {
        warnings: messages.warnings
      }

      resolve(resolveArgs)
    })
  })
}
