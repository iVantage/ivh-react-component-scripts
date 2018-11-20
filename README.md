# IVH React Component Scripts

This module declares dependencies required for components built with the
[ivh-react-component yeoman generator][1] and also provides common scripts for
developing those components.

Why? Mostly because it's tedious to manage and synchronize large dependency
lists between many packages. We also aim to keep package versions consistent
with those used by [react-scripts][2].

This lets us have a single package version to bump and easily separates shared
dependencies vs those required for an individual module.

We currently support scripts for...

## Building

Add `ivh-react-component-scripts build` as an npm script in your package.json,
e.g.:

```javascript
// package.json
{
  "name": "foo-package",
  "scripts": {
    "build": "ivh-react-component-scripts build"
  }
}
```

Then simply run `npm run build` or `yarn build`.


## Testing

Add `ivh-react-component-scripts test` as an npm script, e.g.:

```javascript
// package.json
{
  "name": "foo-package",
  "scripts": {
    "test": "ivh-react-component-scripts test"
  }
}
```

Then simpy run `npm test` or `yarn test`. Note that, unlike `react-scripts`, we
don't "watch" your source files by default. Use the jest paramters `--watch` or
`--watchAll` to enable watching.

You may place a test setup file at `src/setup-tests.js` if you need to run a
script to configure or setup the testing framework before each test - e.g. to
register an adapter for Enzyme. See the [jest docs][3] for more information.


[1]: https://github.com/ivantage/generator-ivh-react-component
[2]: https://github.com/facebook/create-react-app
[3]: https://jestjs.io/docs/en/configuration.html#setuptestframeworkscriptfile-string
