const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development'

function resolve(dir) {
  return path.join(__dirname, dir)
}

const { devPlugins, buildPlugins } = {
  devPlugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDev ? '[name].css' : '[name].[hash:5].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash:5].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: resolve('dist/index.html'),
      template: 'index.html',
      inject: true
    })
  ],
  buildPlugins: [
    new CleanWebpackPlugin(['dist/*'], {
      root: __dirname, //根目录
      verbose: true, //开启在控制台输出信息
      dry: false //启用删除文件
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: isDev ? '[name].css' : '[name].[hash:5].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash:5].css',
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      filename: resolve('dist/index.html'),
      template: 'index.html',
      inject: true
    })
  ]
}

const webpackConfig = {
  mode: isDev ? 'development' : 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    publicPath: isDev ? '/' : '/'
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '@utils': resolve('src/utils'),
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it use publicPath in webpackOptions.output
          publicPath: '/'
        }
      }, {
        loader: 'css-loader',
        options: { importLoaders: 1 }
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: isDev ? [] : [
            require('autoprefixer')({
              "browsers": [
                "defaults",
                "not ie < 9",
                "last 4 versions"
              ]
            })
          ]
        }
      }]
    }, {
      test: /\.less$/,
      use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            // you can specify a publicPath here
            // by default it use publicPath in webpackOptions.output
            publicPath: '/'
          }
        }, {
          loader: 'css-loader',
          options: { importLoaders: 1 }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: isDev ? [] : [
              require('autoprefixer')({
                "browsers": [
                  "defaults",
                  "not ie < 9",
                  "last 4 versions"
                ]
              })
            ]
          }
        },
        { loader: 'less-loader' }
      ]
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1024,
          // [path][name].[ext] path是绝对路径
          name: isDev ? '[path][name].[ext]' : 'images/[name]-[hash:5].[ext]',
          publicPath: '/',
          outputPath: ''
        }
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8000,
          // [path][name].[ext] path是绝对路径
          name: isDev ? '[path][name].[ext]' : 'fonts/[name]-[hash:5].[ext]',
          publicPath: '/',
          outputPath: ''
        }
      }
    }]
  },
  plugins: [
    ...(isDev ? devPlugins : buildPlugins)
  ],
  devtool: isDev ? 'module-source-map' : '#source-map',
  devServer: {
    proxy: {
      '/proxyApi': {
        target: 'http://admin.test.kucdn.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/proxyApi': '/'
        }
      }
    },
    contentBase: resolve('dist/'),
    open: true,
    port: 3000,
    hot: true
  }
}

if (!isDev) {
  webpackConfig.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      name: 'common',
      minSize: 0,
      minChunks: 2
    },
    runtimeChunk: {
      name: 'manifest'
    }
  }
}

module.exports = webpackConfig;
