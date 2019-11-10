const { resolve } = require('path');

module.exports = {
	node: {
		fs: 'empty',
		net: 'empty'
	},
	mode: 'development',
	entry: resolve(__dirname, '.build/client.js'),
	output: {
		path: resolve(__dirname, '.build/public'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [
					resolve(__dirname, '.build/server.js')
				]
			}
		]
	}
}