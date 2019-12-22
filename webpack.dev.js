const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const dir = path.resolve(__dirname, '.');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
	output: {
		filename: '[name].[hash:8].js',
	},
	devServer: {
		publicPath: '/',
		hot: true
	},
	module: {
		rules: [
			{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
				]
			},
			{
			test: /\.(png|svg|jpe?g|gif)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
					}
				}
			]
		}
		]
	}
});
