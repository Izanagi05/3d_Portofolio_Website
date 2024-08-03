const path = require('path'); 
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const defaulConfig =require('./webpack.config.js')

module.exports = merge(defaulConfig,{ 
  mode:'production',
  output: {
    path: path.resolve(__dirname, '../dist'),  
    filename: '[contenthash].js',  
    // assetModuleFilename:'asset/[name][ext]',
    clean:true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', 
       filename: '[contenthash].html'
    }),
    
      new CleanWebpackPlugin()
  
]
});
