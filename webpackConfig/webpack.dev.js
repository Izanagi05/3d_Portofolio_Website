const path = require('path'); 
const { merge } = require('webpack-merge')
const defaulConfig =require('./webpack.config.js')

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(defaulConfig,{ 
    mode:'development',
    output: {
        path: path.resolve(__dirname, '../dist'),  
        filename: 'mymain.js',  
        // assetModuleFilename:'asset/[name][ext]',
        clean:true
      },
  devServer: {
    // contentBase: path.resolve(__dirname, 'dist'), // Direktori untuk dev server
    port: 9000, 
    liveReload:true
    
  },
  watch:true,
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', 
       filename: 'index.html'
    }),
]
});
