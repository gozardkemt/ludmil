const path = require('path');
const dir = path.resolve(__dirname, '.');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
	path: dir + '/public'
  },
  module: {
      rules: [
		{
            test: /\.(png|svg|jpe?g|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[hash:8].[ext]'
                    }
                },
				{
					loader: 'url-loader',
                	options: {
                    	limit: 8000,
                    	name: 'img/[name].[hash:8].[ext]'
					}
                }
            ]
		}
      ]
  },
  plugins: [
		new CleanWebpackPlugin({
			verbose: true,
			template: './public/*'
		}),
		new HtmlWebpackPlugin({
			filename: dir + '/public/index.html',
			template: dir +'/src/index.html'
		})
  ]
};
