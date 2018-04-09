var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
  'react', 'lodash', 'redux', 'react-redux', 'react-dom',
  'faker', 'react-input-range', 'redux-form', 'redux-thunk'
];

module.exports = {
  entry: {
    bundle: './src/index.js',
    vendor: VENDOR_LIBS
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
    // use Chunk Hashing for Cache Busting
    // add a hash code to the name of webpack files
    // whenever any .js file (in src folder) change any character, Chunk Hashing create a new hash code
    // -> unique name whenever run build -> busting the cache for browser
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/
      }
    ]
  },
  plugins: [
    // use plugin below to avoid duplicate dependencies in bundle.js & vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
      // everytime bundle.js changes, webpack mistake think vendor.js change as well
      // manifest create a 3rd .js file -> manifest.js
      // => tell the browser actually the vendor.js file change or not
      // use manifest to avoid webpack automatic change vendor.js file when bundle.js change
    }),
    // use plugin below to add webpack files (bundle.js, vendor.js) to html <script></script>
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};
