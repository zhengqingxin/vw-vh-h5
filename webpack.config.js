const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_[chunkhash:8].js',
    libraryTarget:'umd',
    library:'App'
  },
  module: {
    rules:[
      {
        test:/\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use:[
            { loader: 'css-loader', options: { minimize: true } },
            { loader: 'postcss-loader', options: {
              config: {
                path: 'postcss.config.js'
              }
            }},
          ] 
        })
      },
      { test: /\.(png|jpg)$/, include : path.join(__dirname, 'static'),loader: "file-loader?name=[path][name].[ext]" }
    ]
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'index.ejs',
      inlineSource:'.(js|css)$',
      minify:{
        removeComments: true,
        removeAttributeQuotes: false,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      }
    }),
    new ExtractTextPlugin("styles_[chunkhash:8].css"),    
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    new HtmlWebpackInlineSourcePlugin()
  ]  
};