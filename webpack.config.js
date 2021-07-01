
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
module.exports = ({remote}, {mode, configName}) => {

  let config = {
    entry: [`${__dirname}/source-code/client/index.tsx`],    
    output: {
      filename: `frontline-bundle.js`,
      path: `${__dirname}/host-package`
    },
    name: 'Frontline',
    resolve: {
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
      modules: ['node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },    
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(j|t)s(x)?$/,
          exclude: /node_modules/,
          use: [
            {loader: 'react-hot-loader/webpack'},
            {
            loader: 'awesome-typescript-loader',
            options: {
              cacheDirectory: true,
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  { targets: { browsers: 'last 2 versions' } }, // or whatever your project requires
                ],
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
              plugins: [
                // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                'react-hot-loader/babel',
              ],
            },
          }],
        },
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'url-loader',
          options: {
            limit: false,
            fallback: 'file-loader',
            name: 'images/[folder]/[name].[hash:8].[ext]'
          }
        },
        {
          test: /\.mp3$/,
          loader: 'file-loader',
          options:{
            name: 'sounds/[name].[ext]'
          }
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: "Frontline",
        meta:{viewport: "width=device-width, initial-scale=1.0"}
      }),
    ]
  }

  if(mode !== 'production'){
    config = {
      ...config, 
      mode: 'development',
      devtool: 'eval-source-map',
      devServer: { 
        liveReload: true,
        port: 8888,
        hot: true,
        open: true,
        proxy: {
          '/api': {
            target: 'ws://localhost:6969',
            ws: true
          }
        }
      }
    }
  }



  return config
};