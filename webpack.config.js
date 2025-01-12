const HtmlWebpackPlugin = require("html-webpack-plugin")
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const path = require('node:path')
const deps = require('./package.json').dependencies

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3002,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
          'url-loader'
        ]
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',
      library: { type: "var", name: "remoteApp" },
      filename: 'remoteEntry.js',
      exposes: {
        "./CardTransaction": "./src/components/card-transaction.tsx",
      },
      shared: {
        "react-dom": {
          singleton: true,
        },
        react: {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
}
