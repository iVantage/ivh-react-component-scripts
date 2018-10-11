/* eslint-env node */

const paths = require('./paths')

//const path = require('path')
//const srcPath = path.join(__dirname, 'src')
//const distPath = path.join(__dirname, 'dist')

module.exports = {
  entry: paths.entry,
  resolve: {
    extensions: ['.js']
  },
  output: {
    library: 'PlrQuickLinks',
    libraryTarget: 'umd',
    path: paths.dist,
    filename: 'index.js'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      include: paths.src
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?importLoaders=1',
        'postcss-loader'
      ]
    }]
  }
}

