
'use strict'

/**
 * Give a package name, guesses a library name (i.e. UMD global)
 *
 * E.g.
 *
 * @plr/foo --> PlrFoo
 * @plr/cmp-foo --> PlrFoo (special case for iVantage things, drop (cmp|mod|app)
 * foo-bar --> FooBar
 * foo---bar --> FooBar
 */
module.exports = function inferLibraryName (pkgName) {
  return pkgName
    .split(/[^\w\d]/)
    .filter(Boolean)
    .filter((part, ix) => ix !== 1 || !/cmd|mod|app/i.test(part))
    .map(str => str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase())
    .join('')
}
