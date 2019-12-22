const path = require('path');
const dir = path.resolve(__dirname, '.');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
	path: dir + '/docs'
  },
  plugins: [
		new HtmlWebpackPlugin({
			filename: dir + '/docs/index.html',
			template: dir +'/src/index.html'
		})
  ]
};
