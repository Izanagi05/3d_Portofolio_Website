const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')


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
      test: /\.html$/i,
      loader: "html-loader",
    },
    {
      test: /\.(jpg|png|gif|svg)$/i,
      type: 'asset/resource', 
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
  
  new HtmlWebpackPlugin({
    template: './src/index.html', 
     filename: 'index.html',
     minify:true
  }),
    // new MiniCSSExtractPlugin({
    //   filename: 'styles/[contenthash].css',
    // })
    
  ], 
};
