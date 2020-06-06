const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    publications: './src/pages/publications'
  },
  devServer: {
    port: 9409,
    publicPath: '/',
    contentBase: path.join(__dirname, 'public')
  },
  resolve: {
    alias: {
      assets: path.join(__dirname, './src/style/assets')
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/, use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          }
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
    }),

    new HtmlWebpackPlugin({
      template: './src/pages/publications/index.html',
      filename: 'publications/index.html',
      chunks: ['publications'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
    }),

    new MiniCssExtractPlugin({
      filename: "[name][hash].css",
      chunkFilename: "[id][hash].css",
    }),

    new CleanWebpackPlugin(),

    new CopyWebpackPlugin({
      patterns: [{ from: './src/public', to: 'public' }]
    })
  ],
}
