const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  entry:'./src/index.js',  
 
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',  
        },
      },
      {
        test: /\.css$/,
        use:
        [
            MiniCSSExtractPlugin.loader,
            'css-loader'
        ]
    },
      {
        test: /\.(html)$/,
        use:
        [
            'html-loader'
        ]
    },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:7].[ext]', // Menentukan nama dan lokasi output gambar
            },
          },
        ],
        
      },
      {
        test: /\.(mp3)$/,
        use:
        [
            {
                loader: 'file-loader',
                options:
                {
                    outputPath: 'assets/audios/'
                }
            }
        ]
    }
    ],
  },
  plugins: [ 
    new CopyWebpackPlugin({
      patterns: [
          { from: path.resolve(__dirname, '../public') }
      ]
  }),
    // new MiniCSSExtractPlugin({
    //   filename: 'styles/[contenthash].css',
    // })
  ], 
};
