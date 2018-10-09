# IVH React Component Scripts

This module declares dependencies required for components built with the
[ivh-react-component yeoman generator][1] and also provides common scripts for
developing those components.

Why? Mostly because it's tedious to manage and synchronize large dependency
lists between many packages. We also aim to keep package versions consistent
with those used by [react-scripts][2].

This lets us have a single package version to bump and easily separates shared
dependencies vs those required for an individual module.

[1]: https://github.com/ivantage/generator-ivh-react-component
[2]: https://github.com/facebook/create-react-app
