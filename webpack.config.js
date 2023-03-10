const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const mode = process.env.NODE_ENV || 'development'

const devMode = mode === 'development'

const target = devMode ? 'web' : 'browserslist'
const devtool = devMode ? 'source-map' : undefined

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
  },
  entry:["@babel/polyfill", path.resolve(__dirname, "src", "index.js")],
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'index.js',
    assetModuleFilename: 'assets/[name][ext]'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'play.html',
    //   template: path.resolve(__dirname, 'src', 'play.html')
    // }),
    // new HtmlWebpackPlugin({
    //   filename: 'score.html',
    //   template: path.resolve(__dirname, 'src', 'score.html')
    // }),
    new MiniCssExtractPlugin ({
      filename: 'index.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader', 
      },
       {
        test: /\.(c|sa|sc)ss$/i,
        use: [
         devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader",
         {
           loader: 'postcss-loader',
           options: {
             postcssOptions: {
               plugins: [require('postcss-preset-env')],
             }
           }
         },
         'sass-loader'
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(gif|webp|webm)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
        type: 'asset/resource',
      },
       {
        test: /\.(svg|mp4|png|jpe?g|)$/i,
        use: [{
          loader: 'image-webpack-loader',
          options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
      },
        }],
        type: 'asset/resource',
      },
      {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    ]
  },
}