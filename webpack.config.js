const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractStyles = new ExtractTextPlugin({
  filename: '[name].css',
});

module.exports = function webpackConfig(environment) {
  const env = environment || {};

  return {
    devtool: 'source-map',
    entry: {
      popup: './src/popup.jsx',
      background: './src/background.js',
    },
    output: {
      path: path.resolve(__dirname, 'extension/dist'),
      filename: '[name].js',
    },
    stats: {
      children: false,
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          loader: 'eslint-loader',
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: extractStyles.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          }),
        },
        {
          test: /\.scss$/,
          use: extractStyles.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          }),
        },
        {
          test: [
            /\.bmp$/,
            /\.gif$/,
            /\.jpe?g$/,
            /\.png$/,
            /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          ],
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.join(__dirname, 'src'),
        'node_modules',
      ],
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${env.production ? 'production' : 'development'}"`,
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: !!env.production,
        mangle: !!env.production,
        output: {
          beautify: !env.production,
          comments: false,
        },
      }),
      extractStyles,
    ],
  };
};
