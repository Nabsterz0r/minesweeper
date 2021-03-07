const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	output: {
	  path: path.resolve(__dirname, 'dist'),
	  filename: 'main.bundle.js',
	  chunkFormat: 'commonjs'
	},
	devServer: {
		contentBase: path.join(__dirname),
		compress: true,
		port: 9000,
	},
	module: {
		rules: [
		  {
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/,
		  },
		  {
			test: /\.css$/i,
			use: ["style-loader", "css-loader"],
		  },
		],
	},
	resolve: {
		extensions: [ '.tsx', '.ts', '.js' ],
	},
};
