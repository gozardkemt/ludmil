const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminWebp = require('imagemin-webp');

module.exports = merge(common, {
    mode: 'production',
	output: {
		filename: '[name].[chunkhash:8].js',
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							context: 'src/img',
							outputPath: 'img'
						}
					}
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
						}
					},
					'css-loader',
					'clean-css-loader',
					'postcss-loader'
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin({
			verbose: true,
			template: './docs/*'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[chunkhash:8].css',
			chunkFilename: "[id].css"
		}),
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			plugins: [
				imageminWebp({preset:'photo', quality: 50})
			]
		}),
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			minFileSize: 20000,
			plugins: [
				imageminWebp({preset:'photo', quality: 40})
			]
		}),
		new ImageminPlugin({
			test: /\.(jpe?g|png|gif|svg)$/i,
			minFileSize: 20000,
			plugins: [
				imageminWebp({preset:'photo', quality: 30})
			]
		})
	]
});
