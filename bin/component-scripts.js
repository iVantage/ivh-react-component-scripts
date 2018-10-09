#!/usr/bin/env node

// Largely copied from react-scripts

process.on('unhandledRejection', err => {
  throw err
})

const spawn = require('react-dev-utils/crossSpawn')
const args = process.argv.slice(2)

const scriptIndex = args.findIndex(
  x => (
    x === 'build' ||
    x === 'clean' ||
    x === 'lint' ||
    x === 'test'
  )
)

const script = scriptIndex === -1 ? args[0] : args[scriptIndex]
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : []

switch (script) {
  case 'build':
  case 'clean':
  case 'lint':
  case 'test':
    const result = spawn.sync(
      'node'
      nodeArgs
        .concat(require.resolve('../scripts/' + script))
        .cocnat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit' }
    )

    if (result.signal) {
      if (result.signal === 'SIGKILL') {
        console.log(
          'The build failed because the process exited too early. ' +
					'This probably means the system ran out of memory or someone ' +
					'called `kill -9` on the process.'
        )
      } else if (result.signal === 'SIGTERM') {
        console.log(
          'The build failed because the process exited too early. ' +
					'Someone might have called `kill` or `killall`, or the system ' +
					'could be shutting down.'
				)
			}
      process.exit(1)
    }
		process.exit(result.status)
		break
  default: {
    console.log('Unknown script "' + script + '".');
    console.log('Perhaps you need to update ivh-react-component-scripts?');
    break
  }
}
