/* eslint-env node */

'use strict'

const path = require('path')
const paths = require('./paths')
const inferLibraryName = require('../utils/infer-library-name')

// Opt in to creating source maps.
const useSourceMap = process.env.GENERATE_SOURCEMAP === 'true'

// You can provide your own library name or we'll infer one
const libraryName = process.env.hasOwnProperty('LIBRARY_NAME')
  ? process.env.LIBRARY_NAME
  : inferLibraryName(require(paths.appPkg).name)

module.exports = {
  mode: 'production',
  bail: true,
  devtool: useSourceMap ? 'source-map' : false,
  entry: [paths.entry],
  output: {
    library: libraryName,
    libraryTarget: 'umd',
    path: paths.dist,
    filename: 'index.js',
    devtoolModuleFilenameTemplate: info => path
      .relative(paths.src, info.absoluteResourcePath)
      .replace(/\\/g, '/')
  },
  resolve: {
    extensions: ['.js']
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
      oneOf: [
        {
          test: [/\.bmpg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        },
        {
          test: /\.js$/,
          loader: require.resolve('babel-loader'),
          include: paths.src,
          options: {
            customize: require.resolve('babel-preset-react-app/webpack-overrides'),
            babelrc: false,
            configFile: false,
            presets: [require.resolve('babel-preset-react-app')],
            cacheDirectory: true,
            cacheCompression: false,
            plugins: [
              [
                require.resolve('babel-plugin-named-asset-import'),
                {
                  loaderMap: {
                    svg: {
                      ReactComponent: '@svg/webpack?-prettier,-svgo![path]'
                    }
                  }
                }
              ]
            ]
          }
        },
        {
          test: /\.css$/,
          loader: [
            'style-loader',
            'css-loader?importLoaders=1',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  require('postcss-preset-env')({
                    flexbox: 'no-2009',
                    stage: 3
                  })
                ],
                sourceMap: useSourceMap
              }
            }
          ]
        },
        {
          loader: require.resolve('file-loader'),
          exclude: [/\.js$/, /\.html$/, /\.json/],
          options: {
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      ]
    }]
  }
}
