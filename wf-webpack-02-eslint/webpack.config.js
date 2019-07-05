const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      port: 8888,
      historyApiFallback: true,
      stats: 'minimal'
    },
    resolve: {
      extensions: ['*', '.mjs', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.m?jsx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title:'React Lab',
        template: 'src/index.html'
      })
    ]
  }
}
